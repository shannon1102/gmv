'use strict'
const mysql = require('mysql');
const logger = require('../../logger');
const {to} = require('../../helper/to');
class MainCatergoryService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }

    getAllMainCatergory(itemsPerPage, pageNumber, orderType) {
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
                SELECT * FROM catergory
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
            return resolve(catergoryResult[0])
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
    createMainCatergory(name,description,url_image) {
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
    updateMainCatergory(id,name,description,url_image) {
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
                const query = `
                    DELETE FROM catergory
                    WHERE main_catergory_id = ${mysql.escape(id)}
                `

                let result = await this.mysqlDb.poolQuery(query)
                
                const query1 = `
                DELETE FROM main_catergory
                WHERE id = ${mysql.escape(id)}
                `
                let result1 = await this.mysqlDb.poolQuery(query1)
                if (result1.affectedRows === 0) {
                    return reject(`main catergory with id ${id} not found`)
                }
                return resolve()
            } catch (err) {
                logger.error(`[CatergoryService][deleteCatergory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
        })
    }

}


module.exports = MainCatergoryService