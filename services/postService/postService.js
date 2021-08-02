'use strict'

const mysql = require('mysql');
const logger = require('../../logger');
const {to} = require('../../helper/to');

class PostService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }
    getPosts(postsPerPage, pageNumber, orderType) {
        return new Promise(async (resolve, reject) => {
            let offsetDb, orderByDb
            orderType = orderType ? orderType : 'newest'
            pageNumber = pageNumber ? pageNumber : 1
            if (!postsPerPage) {
                postsPerPage = 10000000000
                offsetDb = 0
            } else {
                offsetDb = postsPerPage * (pageNumber - 1)
            }
            if (orderType === 'oldest') {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = `
                SELECT * FROM posts
                ORDER BY created_at ${mysql.escape(orderByDb).split(`'`)[1]}
                LIMIT ${postsPerPage}
                OFFSET ${mysql.escape(offsetDb)}
            `
            console.log(query);
            let [err, postsResult] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[postService][getPosts] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            } else {
                return resolve(postsResult)
            }

        })
    }

}

module.exports = PostService