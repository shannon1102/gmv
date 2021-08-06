'use strict'
const express = require('express');
const MysqlDB = require('../../models/mysql');
const HotProductService = require('../../services/hotProductService/hotProductService');
const hotProductApi = express.Router();
const mysqlDb = new MysqlDB();
const hotProductService = new HotProductService(mysqlDb);
const {checkRequiredFieldInBody} = require('../../middleware/index')
const {verifyToken,adminRole} = require('../../middleware/verifyToken')


hotProductApi.get('/', (req,res,next) => {
    let {productPerPage,pageNumber,orderType,search} = req.query;
    hotProductService
    .getHotProducts(productPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        res.status(200).json(listProduct)
    })
    .catch(err=>{
        return res.status(500).json({message: err})
    })

})

hotProductApi.get('/set/:product_id',verifyToken,adminRole, (req,res,next)=>{
    let {product_id} = req.params
    console.log(req.body)
    hotProductService
    .setHotProduct(product_id)
    .then(result => { 
        res.status(200).json({
            message: 'Add new Hot-Product successfully'
        })
    })
    .catch(err => {
        return res.status(500).json({message : err})
    })  
})

hotProductApi.get('/unset/:product_id',verifyToken,adminRole, (req,res,next)=>{
    let {product_id} = req.params
    hotProductService
    .unSetHotProduct(product_id)
    .then(result=>{
        
        res.status(200).json({result:result, message: 'Remove Hot-Product successfully'})
    })
    .catch(err=>{
        return res.status(500).json({message : err})
    })  
})

module.exports = hotProductApi;