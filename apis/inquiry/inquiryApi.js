'use strict'
const express = require('express');
const MysqlDB = require('../../models/mysql');
const InquiryService = require('../../services/inquiryService/inquiryService');
const inquiryApi = express.Router();
const mysqlDb = new MysqlDB();
const inquiryService = new InquiryService(mysqlDb);
const {checkRequiredFieldInBody} = require('../../middleware/index')


inquiryApi.get('/', (req,res,next) => {
    let {itemsPerPage,pageNumber,orderType} = req.query;
    inquiryService
    .getInquiries(itemsPerPage,pageNumber,orderType)
    .then(listInquiry => {
        res.status(200).json(listInquiry)
    })
    .catch(err=>{
        return res.status(500).json({message: err})
    })

})
inquiryApi.get('/get-by-catergory-id/:catergory_id', (req,res,next) => {
    
    let {catergory_id} = req.params
    console.log(catergory_id);
    let {inquiryPerPage,pageNumber,orderType,search} = req.query;
    inquiryService
    .getinquirysByCatergoryId(catergory_id,inquiryPerPage,pageNumber,orderType,search)
    .then(listinquiry => {
        res.status(200).json(listinquiry)
    })
    .catch(err=>{
        return res.status(500).json({message: err})
    })

})

inquiryApi.get('/get-by-customer-name/:name', (req,res,next) => {
    
    let {name} = req.params
    console.log(name);
    let {search} = req.query;
    inquiryService
    .getInquirysByCustomerName(name,search)
    .then(listinquiry => {
        res.status(200).json(listinquiry)
    })
    .catch(err=>{
        return res.status(500).json({message: err})
    })

})
inquiryApi.get('/:id',(req,res,next)=>{
    let {id} = req.params
    console.log(id)
    inquiryService
    .getInquiryById(id)
    .then(inquiry=>{
        res.status(200).json(inquiry)
        })
    .catch(err=>{
        return res.status(500).json({message : err})
    })  
})
inquiryApi.post('/',checkRequiredFieldInBody(['phone','product_id']), (req,res,next)=>{
    let {customer_name,email,phone,message,product_id,quantity} = req.body
    console.log(req.body)
    inquiryService
    .createInquiry(customer_name,email,phone,message,product_id,quantity)
    .then(result => { 
        res.status(200).json({
            message: 'Post new inquiry successfully'
        })
    })
    .catch(err => {
        return res.status(500).json({message : err})
    })  
})

inquiryApi.delete('/:id', (req,res,next)=>{
    let {id} = req.params
    inquiryService
    .deleteInquiry(id)
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        return res.status(500).json({message : err})
    })  
})



module.exports = inquiryApi;