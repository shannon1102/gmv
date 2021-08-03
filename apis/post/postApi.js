'use strict'

const express = require('express')
const MysqlDB = require('../../db/mysql')
// const PostService = require('../../services/postService/postService')

const postApi = express.Router()
const mysqlDb = new MysqlDB()
// const postService = new PostService(mysqlDb)

postApi.get('/', (req, res, next) => {
    return res.status(200).json('post route acitve ok');
})



module.exports = postApi