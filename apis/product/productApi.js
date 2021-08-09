'use strict'
const express = require('express');
const MysqlDB = require('../../models/mysql');
const ProductService = require('../../services/productService/productService');
const productApi = express.Router();
const mysqlDb = new MysqlDB();
const productService = new ProductService(mysqlDb);
const {checkRequiredFieldInBody} = require('../../middleware/index')
const {verifyToken,adminRole} = require('../../middleware/verifyToken')

productApi.get('/', (req,res,next) => {
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProducts(productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/get-by-catergory-id/:catergory_id', (req,res,next) => {
    
    let {catergory_id} = req.params
    console.log(catergory_id);
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByCatergoryId(catergory_id,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/get-by-catergory-id/:catergory_id', (req,res,next) => {
    
    let {catergory_id} = req.params
    console.log(catergory_id);
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByCatergoryId(catergory_id,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})



productApi.get('/get-by-catergory-and-material/', (req,res,next) => {
    
    let {catergory_name,material,productsPerPage,pageNumber,orderType,search} = req.query;
  
    productService
    .getProductsByCatergoryAndMaterial(catergory_name,material,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{   
        return res.status(500).json({status:500,message: err})
    })

})


productApi.get('/get-by-catergory-name/:name', (req,res,next) => {
    
    let {name} = req.params
    console.log(name);
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByCatergoryName(name,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/get-by-main-catergory-id/:id', (req,res,next) => {
    
    let {id} = req.params
    console.log(id);
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByMainCatergoryId(id,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/:id',(req,res,next)=>{
    let {id} = req.params
    console.log(id)
    productService
    .getProductById(id)
    .then(listProduct=>{
        return res.status(200).json({status:200,message:"Success",data: listProduct})
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.post('/',verifyToken,adminRole,checkRequiredFieldInBody(['title','description','model_number','main_image_url','price','material','size','catergory_id']), (req,res,next)=>{
    let {title,description,model_number,main_image_url,price,material,size, catergory_id} = req.body
    console.log(req.body)
    productService
    .createProduct(title,description,model_number,main_image_url,price,material,size, catergory_id)
    .then(result => { 
        return res.status(200).json({
            status:200,
            message: 'Post new product successfully'
        })
    })
    .catch(err => {
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.post('/upload-product-image/:id',verifyToken,adminRole,checkRequiredFieldInBody(['title','description','model_number','main_image_url','price','material','size', 'catergory_id']), (req,res,next)=>{
    let {id} = req.params
    let {title,description,model_number,main_image_url,price,material,size, catergory_id} = req.body
    console.log(description)
    productService
    .updateProduct(id,title,description,model_number,main_image_url,price,material,size, catergory_id)
    .then(result=>{
        return res.status(200).json({
            status:200,
            message: 'Update product-image sucessfully',
            product: result
            })
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.delete('/:id',verifyToken,adminRole,(req,res,next)=>{
    let {id} = req.params
    productService
    .deleteProduct(id)
    .then(result=>{
        return res.status(200).json({
            status:200,
            message: 'Detele product sucessfully',
            })
        
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.post('/upload-image/:product_id',verifyToken,adminRole, (req,res,next)=>{
    let {product_id} = req.params
    let {url_image1,url_image2,url_image3,url_image4} = req.body
    productService
    .uploadProductImage(product_id,url_image1,url_image2,url_image3,url_image4)
    .then(result=>{
        return res.status(200).json({
            status:200,
            message: "Upload image successfully",
            data: result
          })
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.put('/update-image/:product_id',verifyToken,adminRole, (req,res,next)=>{
    let {product_id} = req.params
    let {url_image1,url_image2,url_image3,url_image4} = req.body
    productService
    .updateProductImage(product_id,url_image1,url_image2,url_image3,url_image4)
    .then(result=>{
        return res.status(200).json({  
            status:200,
            message: "Update product-image successfully",
            data:result
            })
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})

module.exports = productApi;