'use strict'

const express = require('express')
const MysqlDB = require('../../models/mysql')
const {checkRequiredFieldInBody} = require('../../middleware')
const PostService = require('../../services/postService/postService')

const { verifyToken,adminRole } = require('../../middleware/verifyToken')

const postApi = express.Router()
const mysqlDb = new MysqlDB()
const postService = new PostService(mysqlDb)

postApi.get('/', async (req, res, next) => {
    try {
        let {postsPerPage, pageNumber, orderType} = req.query
        const postsFounded = await postService.getPosts(postsPerPage, pageNumber, orderType)

        return res.status(200).json(postsFounded)
    } catch (error) {
        return res.status(500).json({message: error})
    }
})

postApi.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const postFounded = await postService.getPostById(id)

        return res.status(200).json(postFounded)
    } catch (error) {
        return res.status(500).json({message: error})
    }
})

postApi.post('/',verifyToken,adminRole,
    checkRequiredFieldInBody(['title', 'content','catergory_id']),
    async (req, res, next) => {
        try {
            let {title,image,description, content,catergory_id} = req.body
            const insertedId = await postService.createPost(title,image,description, content,catergory_id)

            return res.status(200).json({message: 'create new post successfully', insertedId})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

postApi.put('/:id',verifyToken,adminRole,
    checkRequiredFieldInBody(['title', 'content']),
    async (req, res, next) => {
        let {id} = req.params
        try {
            let {title,image,description, content,catergory_id} = req.body
            await postService.updatePost(id, title,image,description, content,catergory_id)

            return res.status(200).json({message: 'updated post successfully'})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

postApi.delete('/:id',verifyToken,adminRole,
    async (req, res, next) => {
        let {id} = req.params
        try {
            await postService.deletePost(id)

            return res.status(200).json({message: 'removed post successfully'})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

module.exports = postApi