'use strict'
const mysql = require('mysql');
const logger = require('../../logger');
const { to } = require('../../helper/to');
const { query } = require('winston');
class CatergoryService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }

    getAllCatergory(itemsPerPage, pageNumber, orderType) {
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
                logger.error(`[CatergoryService][getCatergories] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            } else {
                return resolve(result)
            }

        })
    }
    getCatergoryById(id) {
        return new Promise(async (resolve, reject) => {
            try {  
                const query2 = `
                SELECT * FROM catergory WHERE id = ${mysql.escape(id)}
                `
                const [err, catergoryResult] = await to(this.mysqlDb.poolQuery(query2))
                if (err) {
                    logger.error(`[CatergoryService][getCatergoryById] errors: `, err)
                    return reject(err?.sqlMessage ? err.sqlMessage : err)
                }
                if (!catergoryResult.length) {
                    return reject(`catergory with id ${id} not found`)
                }
                return resolve(catergoryResult[0])

            } catch (error) {
                console.log(error);
                reject(error)
            }

        })
    }
    getCatergoryByName(name) {
        return new Promise(async (resolve, reject) => {
            const query = `
                SELECT * FROM catergory WHERE name = ${mysql.escape(name)}
            `

            const [err, catergoryResult] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[CatergoryService][getCatergoryByName] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(catergoryResult)
        })
    }
    createCatergory(name, main_catergory_id) {
        return new Promise(async (resolve, reject) => {
            const query = `
                INSERT INTO catergory(name,main_catergory_id)
                VALUES(${mysql.escape(name)},${mysql.escape(main_catergory_id)})`

            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                console.log(err);
                logger.error(`[CatergoryService][createCatergory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(result?.insertId)
        })
    }
    updateCatergory(id, name, main_catergory_id) {
        return new Promise(async (resolve, reject) => {
            const query = `
                UPDATE catergory SET 
                name = ${mysql.escape(name)},
                main_catergory_id = ${mysql.escape(main_catergory_id)}
                WHERE id = ${mysql.escape(id)}
            `
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[CatergoryService][updateCatergory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            if (result.affectedRows === 0) {
                return reject(`Catergory with id ${id} not found`)
            }

            return resolve(result)
        })
    }
    deleteCatergory(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `
                    DELETE FROM catergory
                    WHERE id = ${mysql.escape(id)}
                `
                let result = await this.mysqlDb.poolQuery(query)
                if (result.affectedRows === 0) {
                    return reject(`catergory with id ${id} not found`)
                }
                return resolve(`delete successfully`);
            } catch (err) {
                logger.error(`[CatergoryService][deleteCatergory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
        })
    }

}


module.exports = CatergoryService