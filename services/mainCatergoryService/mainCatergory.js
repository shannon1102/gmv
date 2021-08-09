'use strict'
const mysql = require('mysql');
const logger = require('../../logger');
const { to } = require('../../helper/to');
class MainCatergoryService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }

    getAllMainCatergory(itemsPerPage, pageNumber, orderType) {
        console.log("Main")
        return new Promise(async (resolve, reject) => {
            let offsetDb, orderByDb
            orderType = orderType ? orderType : 'newest'
            pageNumber = pageNumber ? pageNumber : 1
            if (!itemsPerPage) {
                itemsPerPage = 100
                offsetDb = 0
            } else {
                offsetDb = itemsPerPage * (pageNumber - 1)
            }
            if (orderType === 'oldest') {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = `
                SELECT * FROM main_catergory
                ORDER BY create_at ${mysql.escape(orderByDb).split(`'`)[1]}
                LIMIT ${itemsPerPage}
                OFFSET ${mysql.escape(offsetDb)}
            `
            console.log(query);
            let [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[MainCatergoryService][getMainCatergories] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            } else {
                return resolve(result)
            }

        })
    }
    getMainCatergoryById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query1 = `
            SELECT * FROM catergory WHERE main_catergory_id = ${mysql.escape(id)}
            `
            const [err1,result] = await to(this.mysqlDb.poolQuery(query1))
            if(err1) {
                return reject(`Sql err ${err1}`)
            }
            const query = `
                SELECT * FROM main_catergory WHERE id = ${mysql.escape(id)}
            `
            const [err, catergoryResult] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[MainCatergoryService][getCatergoryById] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            if (!catergoryResult.length) {
                return reject(`catergory with id ${id} not found`)
            }
            let subCatergory = Object.assign(result)
            catergoryResult[0].sub_catergory = subCatergory
            return resolve(catergoryResult[0])
            } catch (error) {
                return reject(`Sql error`)
            }
            
        })
    }
    getMainCatergoryByName(name) {
        return new Promise(async (resolve, reject) => {
            const query = `
                SELECT * FROM main_catergory WHERE name = ${mysql.escape(name)}
            `

            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[MainCatergoryService][getMainCatergoryByName] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(catergoryResult)
        })
    }
    createMainCatergory(name, description, url_image) {
        return new Promise(async (resolve, reject) => {
            const query = `
                INSERT INTO main_catergory(name,description,url_image)
                VALUES(${mysql.escape(name)},${mysql.escape(description)},${mysql.escape(url_image)})`

            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                console.log(err);
                logger.error(`[MainCatergoryService][createMainCatergory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(result?.insertId)
        })
    }
    updateMainCatergory(id, name, description, url_image) {
        return new Promise(async (resolve, reject) => {
            const query = `
                UPDATE main_catergory SET 
                name = ${mysql.escape(name)},
                description = ${mysql.escape(description)},
                url_image = ${mysql.escape(url_image)}
                WHERE id = ${mysql.escape(id)}
            `
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[MainCatergoryService][updateMaiCatergory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            if (result.affectedRows === 0) {
                return reject(`MainCatergory with id ${id} not found`)
            }

            return resolve(result)
        })
    }
    deleteMainCatergory(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.mysqlDb.beginTransaction()
                const query =
                `
                    DELETE post FROM post JOIN catergory ON post.catergory_id = catergory.id
                    JOIN main_catergory ON main_catergory.id = catergory.main_catergory_id 
                    WHERE main_catergory_id = ${mysql.escape(id)}
                `
                let result = await this.mysqlDb.poolQuery(query)
                
                const query0 =
                `
                    DELETE product_image FROM product_image 
                    JOIN product ON product_image.product_id = product.id
                    JOIN catergory ON product.catergory_id = catergory.id
                    JOIN main_catergory ON main_catergory.id = catergory.main_catergory_id 

                    WHERE main_catergory_id = ${mysql.escape(id)} 
                `
                let result0 = await this.mysqlDb.poolQuery(query0)

                const query1 =
                `
                    DELETE product FROM product JOIN catergory ON product.catergory_id = catergory.id
                    JOIN main_catergory ON main_catergory.id = catergory.main_catergory_id 
                    WHERE main_catergory_id = ${mysql.escape(id)}
                `
                let result1 = await this.mysqlDb.poolQuery(query1)
                const query2 =  `
                DELETE FROM catergory
                WHERE main_catergory_id = ${mysql.escape(id)}
                `
                let result2 = await this.mysqlDb.poolQuery(query2)

                const query3 = `
                DELETE FROM main_catergory
                WHERE id = ${mysql.escape(id)}
                `
                let result3 = await this.mysqlDb.poolQuery(query3)
                if (result3.affectedRows === 0) {
                    return reject(`main catergory with id ${id} not found`)
                }
                await this.mysqlDb.commit()
                return resolve()
            } catch (err) {
                logger.error(`[CatergoryService][deleteCatergory] errors: `, err)
                await this.mysqlDb.rollback()
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
        })
    }

}


module.exports = MainCatergoryService