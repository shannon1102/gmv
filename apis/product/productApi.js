'use strict'
const express = require('express');
const MysqlDB = require('../../models/mysql');
const ProductService = require('../../services/productService/productService');
const productApi = express.Router();
const mysqlDb = new MysqlDB();
const productService = new ProductService(mysqlDb);
const {checkRequiredFieldInBody} = require('../../middleware/index')


productApi.get('/', (req,res,next) => {
    let {productPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProducts(productPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        res.status(200).json(listProduct)
    })
    .catch(err=>{
        return res.status(500).json({message: err})
    })

})
productApi.get('/:id',(req,res,next)=>{
    let {id} = req.params
    console.log(id)
    productService
    .getProductById(id)
    .then(product=>{
        res.status(200).json(product)
        })
    .catch(err=>{
        return res.status(500).json({message : err})
    })  
})
productApi.post('/',checkRequiredFieldInBody(['title','description','model_number','main_image_url','price','material','size','catergory_id']), (req,res,next)=>{
    let {title,description,model_number,main_image_url,price,material,size, catergory_id} = req.body
    console.log(req.body)
    productService
    .createProduct(title,description,model_number,main_image_url,price,material,size, catergory_id)
    .then(result => { 
        res.status(200).json({
            message: 'Post new Product successfully'
        })
    })
    .catch(err => {
        return res.status(500).json({message : err})
    })  
})
productApi.put('/:id',checkRequiredFieldInBody(['title','description','model_number','main_image_url','price','material','size', 'catergory_id']), (req,res,next)=>{
    let {id} = req.params
    let {title,description,model_number,main_image_url,price,material,size, catergory_id} = req.body
    console.log(description)
    productService
    .updateProduct(id,title,description,model_number,main_image_url,price,material,size, catergory_id)
    .then(result=>{
        res.status(200).json({
            message: 'Update product sucessfully',
            product: result
            })
        })
    .catch(err=>{
        return res.status(500).json({message : err})
    })  
})
productApi.delete('/:id', (req,res,next)=>{
    let {id} = req.params
    productService
    .deleteProduct(id)
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        return res.status(500).json({message : err})
    })  
})
// productApi.put('/:id', (req,res,next)=>{
//     let {id} = req.params
//     let {url_image1,url_image2,url_image3,url_image4} = req.body
//     let list_image = []
//     if(url_image1) {
//         list_image.push(url_image1);
//     }
//     if(url_image2) {
//         list_image.push(url_image2);
//     }
//     if(url_image3) {
//         list_image.push(url_image3);
//     }
//     if(url_image4) {
//         list_image.push(url_image4);
//     }
//     console.log(list_image)

//     productService
//     .updateProductImage(id,list_image)
//     .then(result=>{
//         res.status(200).json({
//             message: 'Update product sucessfully',
//             product: result
//             })
//         })
//     .catch(err=>{
//         return res.status(500).json({message : err})
//     })  
// })



module.exports = productApi;