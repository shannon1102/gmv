'use strict'

const express = require('express')
const MysqlDB = require('../../models/mysql')
const {checkRequiredFieldInBody} = require('../../middleware')
const MainCatergoryService = require('../../services/mainCatergoryService/mainCatergory')
const mainCatergoryApi = express.Router()
const mysqlDb = new MysqlDB()
const mainCatergoryService = new MainCatergoryService(mysqlDb)
const { verifyToken,adminRole } = require('../../middleware/verifyToken')


mainCatergoryApi.get('/', async (req, res, next) => {
    try {
        let {itemsPerPage, pageNumber, orderType} = req.query
        const result = await mainCatergoryService.getAllMainCatergory(itemsPerPage, pageNumber, orderType)

        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message: error})
    }
})

mainCatergoryApi.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const mainCatergory = await mainCatergoryService.getMainCatergoryById(id)

        return res.status(200).json(mainCatergory)
    } catch (error) {
        return res.status(500).json({message: error})
    }
})

mainCatergoryApi.post('/',verifyToken,adminRole,
    checkRequiredFieldInBody(['name','description','url_image']),
    async (req, res, next) => {
        try {
            let {name,description,url_image} = req.body
            const insertedId = await mainCatergoryService.createMainCatergory(name,description,url_image)

            return res.status(200).json({message: 'create new main-catergory successfully', insertedId})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })
mainCatergoryApi.put('/:id',verifyToken,adminRole,
    checkRequiredFieldInBody(['name','description','url_image']),
    async (req, res, next) => {
        let {id} = req.params
        try {
            let {name,description,url_image} = req.body
            await mainCatergoryService.updateMainCatergory(id,name,description,url_image)
            return res.status(200).json({message: 'updated main-catergory successfully'})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

mainCatergoryApi.delete('/:id',verifyToken,adminRole,
    async (req, res, next) => {
        let {id} = req.params   
        try {
            await mainCatergoryService.deleteMainCatergory(id)

            return res.status(200).json({message: `Remove MainCatergory with id ${id} successfully`})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

module.exports = mainCatergoryApi