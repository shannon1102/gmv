'use strict'

const express = require('express')
const MysqlDB = require('../../models/mysql')
const {checkRequiredFieldInBody} = require('../../middleware')
const CatergoryService = require('../../services/catergoryService/catergoryService')
const { verifyToken,adminRole } = require('../../middleware/verifyToken')

const catergoryApi = express.Router()
const mysqlDb = new MysqlDB()
const catergoryService = new CatergoryService(mysqlDb)

catergoryApi.get('/', async (req, res, next) => {
    try {
        let {catergorysPerPage, pageNumber, orderType} = req.query
        const catergoryFounded = await catergoryService.getAllCatergory(catergorysPerPage, pageNumber, orderType)
        console.log(catergoryFounded);
        return res.status(200).json(catergoryFounded)
    } catch (error) {
        return res.status(500).json({message: error})
    }
})

catergoryApi.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const catergoryFounded = await catergoryService.getCatergoryById(id)

        return res.status(200).json(catergoryFounded)
    } catch (error) {
        return res.status(500).json({message: error})
    }
})

catergoryApi.post('/',verifyToken,adminRole,
    checkRequiredFieldInBody(['name','main_catergory_id']),
    async (req, res, next) => {
        try {
            let {name,main_catergory_id} = req.body
            const insertedId = await catergoryService.createCatergory(name,main_catergory_id)
            console.log(insertedId)
            return res.status(200).json({message: 'create new catergory successfully', insertedId})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })
catergoryApi.put('/:id',verifyToken,adminRole,
    checkRequiredFieldInBody(['name','main_catergory_id']),
    async (req, res, next) => {
        let {id} = req.params
        try {
            let {name,main_catergory_id} = req.body
            await catergoryService.updateCatergory(id,name,main_catergory_id)
            return res.status(200).json({message: 'updated catergory successfully'})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

catergoryApi.delete('/:id',verifyToken,adminRole,
    async (req, res, next) => {
        let {id} = req.params   
        try {
            await catergoryService.deleteCatergory(id)

            return res.status(200).json({message: 'Remove Catergory successfully'})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

module.exports = catergoryApi