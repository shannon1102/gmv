'use strict' 
const mysql = require('mysql');
const {orderTypeSetting} = require('../../config/index');
const logger = require('../../logger');
const {to} = require('../../helper/to');
const { resolve } = require('app-root-path');

class ProductService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }
    getProducts(productsPerPage,pageNumber,orderType,search){
        return new Promise(
            async (resolve,reject) => {
            let offsetDb = 0, orderByDb;
            orderType = orderType ? orderType : 2
            pageNumber = pageNumber ? pageNumber : 1
            productsPerPage = productsPerPage ? productsPerPage :10
            offsetDb =  productsPerPage * (pageNumber -1)
            search = search ? search : ""
            if (orderType == orderTypeSetting.ASC) {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = 
            `SELECT p.* FROM product as p
            WHERE p.title LIKE ${mysql.escape('%'+search+'%')}
            OR p.description LIKE ${mysql.escape('%'+search+'%')}
            ORDER BY p.create_at ${mysql.escape(orderByDb).split(`'`)[1]}
            LIMIT ${productsPerPage}
            OFFSET ${mysql.escape(offsetDb)}`
            console.log(query)
            let [err,listProduct] = await to(this.mysqlDb.poolQuery(query))
            if(err) {
                logger.error(`[productService][getProducts] errors : `,err)
                return reject(err)
            } else {
                 return resolve(listProduct)
            }

        });
    }
    getProductsByCategoryId(category_id,productsPerPage,pageNumber,orderType,search){
        return new Promise(
            async (resolve,reject) => {
            let offsetDb = 0, orderByDb;
            orderType = orderType ? orderType : 2
            pageNumber = pageNumber ? pageNumber : 1
            productsPerPage = productsPerPage ? productsPerPage :10
            offsetDb =  productsPerPage * (pageNumber -1)
            search = search ? search : ""
            if (orderType == orderTypeSetting.ASC) {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = 
            `SELECT p.* FROM product as p
            WHERE p.category_id = ${mysql.escape(category_id)}
            AND ( p.title LIKE ${mysql.escape('%'+search+'%')}
            OR p.description LIKE ${mysql.escape('%'+search+'%')})
            ORDER BY p.create_at ${mysql.escape(orderByDb).split(`'`)[1]}
            LIMIT ${productsPerPage}
            OFFSET ${mysql.escape(offsetDb)}`
            console.log(query)
            let [err,listProduct] = await to(this.mysqlDb.poolQuery(query))
            if(err) {
                logger.error(`[productService][getProducts] errors : `,err)
                return reject(err)
            } else {
                 return resolve(listProduct)
            }

        });

    }
     getProductsByCategoryId(category_id,productsPerPage,pageNumber,orderType,search){
        return new Promise(
            async (resolve,reject) => {
            let offsetDb = 0, orderByDb;
            orderType = orderType ? orderType : 2
            pageNumber = pageNumber ? pageNumber : 1
            productsPerPage = productsPerPage ? productsPerPage :10
            offsetDb =  productsPerPage * (pageNumber -1)
            search = search ? search : ""
            if (orderType == orderTypeSetting.ASC) {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = 
            `SELECT p.* FROM product as p
            WHERE p.category_id = ${mysql.escape(category_id)}
            AND ( p.title LIKE ${mysql.escape('%'+search+'%')}
            OR p.description LIKE ${mysql.escape('%'+search+'%')})
            ORDER BY p.create_at ${mysql.escape(orderByDb).split(`'`)[1]}
            LIMIT ${productsPerPage}
            OFFSET ${mysql.escape(offsetDb)}`
            console.log(query)
            let [err,listProduct] = await to(this.mysqlDb.poolQuery(query))
            if(err) {
                logger.error(`[productService][getProducts] errors : `,err)
                return reject(err)
            } else {
                 return resolve(listProduct)
            }

        });

    }
    getProductsByMainCategoryId(id,productsPerPage,pageNumber,orderType,search){
        return new Promise(
            async (resolve,reject) => {
            let offsetDb = 0, orderByDb;
            orderType = orderType ? orderType : 2
            pageNumber = pageNumber ? pageNumber : 1
            productsPerPage = productsPerPage ? productsPerPage :10
            offsetDb =  productsPerPage * (pageNumber -1)
            search = search ? search : ""
            if (orderType == orderTypeSetting.ASC) {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = 
            `SELECT p.* FROM product as p JOIN category as c ON p.category_id = c.id
            WHERE c.main_category_id = ${mysql.escape(id)}
            AND ( p.title LIKE ${mysql.escape('%'+search+'%')}
            OR p.description LIKE ${mysql.escape('%'+search+'%')})
            ORDER BY p.create_at ${mysql.escape(orderByDb).split(`'`)[1]}
            LIMIT ${productsPerPage}
            OFFSET ${mysql.escape(offsetDb)}`
            console.log(query)
            let [err,listProduct] = await to(this.mysqlDb.poolQuery(query))
            if(err) {
                logger.error(`[productService][getProducts] errors : `,err)
                return reject(err)
            } else {
                 return resolve(listProduct)
            }

        });

    }

    getProductsByCategoryName(name,productsPerPage,pageNumber,orderType,search){
        return new Promise(
            async (resolve,reject) => {
            let offsetDb = 0, orderByDb;
            orderType = orderType ? orderType : 2
            pageNumber = pageNumber ? pageNumber : 1
            productsPerPage = productsPerPage ? productsPerPage :10
            offsetDb =  productsPerPage * (pageNumber -1)
            search = search ? search : ""
            if (orderType == orderTypeSetting.ASC) {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = 
            `SELECT p.* FROM product as p
            JOIN category ON p.category_id = category.id 
            WHERE category.name = ${mysql.escape(name)}
            AND (p.title LIKE ${mysql.escape('%'+search+'%')}
            OR p.description LIKE ${mysql.escape('%'+search+'%')})
            ORDER BY p.create_at ${mysql.escape(orderByDb).split(`'`)[1]}
            LIMIT ${productsPerPage}
            OFFSET ${mysql.escape(offsetDb)}`
            console.log(query)
            let [err,listProduct] = await to(this.mysqlDb.poolQuery(query))
            if(err) {
                logger.error(`[productService][getProducts] errors : `,err)
                return reject(err)
            } else {
                 return resolve(listProduct)
            }

        });

    }
    getProductsByCategoryAndMaterial(category_name,material,productsPerPage,pageNumber,orderType,search){
        return new Promise(
            async (resolve,reject) => {
            let offsetDb = 0, orderByDb;
            orderType = orderType ? orderType : 2
            pageNumber = pageNumber ? pageNumber : 1
            productsPerPage = productsPerPage ? productsPerPage :10
            offsetDb =  productsPerPage * (pageNumber -1)
            search = search ? search : ""
            if (orderType == orderTypeSetting.ASC) {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = 
            `SELECT p.* FROM product as p
            JOIN category ON p.category_id = category.id 
            WHERE 
            category.name = ${mysql.escape(category_name)}
            AND p.material = ${mysql.escape(material)}
            ORDER BY p.create_at ${mysql.escape(orderByDb).split(`'`)[1]}
            LIMIT ${productsPerPage}
            OFFSET ${mysql.escape(offsetDb)}`
            console.log(query)
            let [err,listProduct] = await to(this.mysqlDb.poolQuery(query))
            if(err) {
                logger.error(`[productService][getProducts] errors : `,err)
                return reject(err)
            } else {
                 return resolve(listProduct)
            }

        });
    }



    getProductById(id) {
        
        return new Promise(async (resolve, reject) => {
            
            const query = `
            SELECT * FROM product_image AS pi
            WHERE pi.product_id = ${mysql.escape(id)}`
            const [err, list_image_result] = await to(this.mysqlDb.poolQuery(query))
            let listImage = Object.assign(list_image_result)
            const query1 = 
            `SELECT p.*,c.main_category_id
            FROM product AS p
            JOIN category AS c
            ON c.id = p.category_id
            JOIN main_category AS mc
            ON mc.id = c.main_category_id
            WHERE p.id = ${mysql.escape(id)}`
            console.log("dsdas");
            console.log(query1)
            const [err1, productResult] = await to(this.mysqlDb.poolQuery(query1))
            console.log(productResult);
            if (err1) {
                logger.error(`[productService][getProductById] errors: `, err)
                return reject(err)
            }
            if (!productResult.length) {
                return reject(`product with id ${id} not found`)
            }
            
            productResult[0].list_product_images = listImage;
            console.log(productResult[0])
            return resolve(productResult[0])
        })
    }

    getProductByCode(model_number) {
        
        return new Promise(async (resolve, reject) => {
            console.log("dsdas");
            const query = `
            SELECT pi.url_image1,pi.url_image2,pi.url_image3,pi.url_image4
            FROM product_image AS pi
            JOIN product AS p ON pi.product_id = p.id
            WHERE p.model_number = ${mysql.escape(model_number)}`
            const [err, list_image_result] = await to(this.mysqlDb.poolQuery(query))
            console.log(list_image_result)
            let listImage = Object.assign(list_image_result)
            const query1 = 
            `SELECT p.*,c.main_category_id
            FROM product AS p
            JOIN category AS c
            ON c.id = p.category_id
            JOIN main_category AS mc
            ON mc.id = c.main_category_id
            WHERE p.model_number = ${mysql.escape(model_number)}
            LIMIT 1`
            
            const [err1, productResult] = await to(this.mysqlDb.poolQuery(query1))
            if (err1) {
                logger.error(`[productService][getProductById] errors: `, err)
                return reject(err)
            }
            if (!productResult.length) {
                return reject(`product with model number ${model_number} not found`)
            }
            
            productResult[0].list_product_images = listImage;
            // console.log(productResult[0])
            return resolve(productResult[0])
        })
    }
    getProductByTitle(title) {
        console.log("????")
        return new Promise(async (resolve, reject) => {
            console.log("dsdas");
            const query = `
            SELECT pi.url_image1,pi.url_image2,pi.url_image3,pi.url_image4
            FROM product_image AS pi
            JOIN product AS p ON pi.product_id = p.id
            WHERE p.title = ${mysql.escape(title)}`
            const [err, list_image_result] = await to(this.mysqlDb.poolQuery(query))
            let listImage = Object.assign(list_image_result)
            const query1 = 
            `SELECT p.*,c.main_category_id
            FROM product AS p
            JOIN category AS c
            ON c.id = p.category_id
            JOIN main_category AS mc
            ON mc.id = c.main_category_id
            WHERE p.title = ${mysql.escape(title)}
            LIMIT 1`
            
            const [err1, productResult] = await to(this.mysqlDb.poolQuery(query1))
            if (err1) {
                logger.error(`[productService][getProductByTitle] errors: `, err)
                return reject(err)
            }
            if (!productResult.length) {
                return reject(`product with title ${title} not found`)
            }
            
            productResult[0].list_product_images = listImage;
            console.log(productResult[0])
            return resolve(productResult[0])
        })
    }
    createProduct(title,description,model_number,main_image_url,price,material,size, category_id){
         return new Promise(async (resolve,reject)=>{
            const query = `INSERT INTO product(title,description,model_number,main_image_url,price,material,size, category_id) 
            VALUES (${mysql.escape(title)},${mysql.escape(description)},${mysql.escape(model_number)},${mysql.escape(main_image_url)},${mysql.escape(price)},${mysql.escape(material)},${mysql.escape(size)},${mysql.escape(category_id)})
            `
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[productService][createProduct] errors: `, err)
                return reject(err)
            }
            return resolve(result)

         })
    }
    updateProduct(id,title,description,model_number,main_image_url,price,material,size, category_id){
            return new Promise(async (resolve,reject)=>{
               const query = `UPDATE product
               SET title = ${mysql.escape(title)},
               description = ${mysql.escape(description)},
               model_number = ${mysql.escape(model_number)},
               main_image_url= ${mysql.escape(main_image_url)},
               price = ${mysql.escape(price)},
               material= ${mysql.escape(material)},
               size= ${mysql.escape(size)},
               category_id = ${mysql.escape(category_id)}
               WHERE id = ${mysql.escape(id)}
               `
               const [err, result] = await to(this.mysqlDb.poolQuery(query))
               if (err) {
                   logger.error(`[productService][updateProduct] errors: `, err)
                   return reject(err)
               }
               return resolve(result)
            })
    }
    deleteProduct(id) {
        return new Promise(async (resolve, reject) => {
            let query = ``
            try {
                await this.mysqlDb.beginTransaction()
                query = `SELECT COUNT(*) AS numProduct FROM product WHERE id = ${mysql.escape(id)}`
                let result1 = await this.mysqlDb.poolQuery(query)
                if (!result1[0].numProduct) {
                    return reject(`Product with id ${id} not found`)
                }

                let query0 = `
                DELETE FROM inquiry
                WHERE  product_id = ${mysql.escape(id)}
                `
                let result0 = await this.mysqlDb.poolQuery(query0)

                query = `
                DELETE FROM product_image
                WHERE  product_id = ${mysql.escape(id)}
                `
                let result2 = await this.mysqlDb.poolQuery(query)
                query = `
                DELETE FROM product
                WHERE id = ${mysql.escape(id)}
                `
                let result3 = await this.mysqlDb.poolQuery(query)

                if (result3.affectedRows === 0) {
                    return reject(`Delete product with id ${id} not sucessfully`)
                }
                await this.mysqlDb.commit()
                return resolve(`Delete product with id ${id} sucessfully`)
            } catch (err) {
                logger.error(`[productService][deleteProduct] errors: `, err)
                await this.mysqlDb.rollback()
                return reject(err.sqlMessage)
            }
        })
    }
    updateProductImage(product_id,url_image1,url_image2,url_image3,url_image4) {
        console.log("Vao update");
        return new Promise(async (resolve,reject)=>{
            const query = `UPDATE product_image
            SET url_image1 = ${mysql.escape(url_image1)},
            url_image2 = ${mysql.escape(url_image2)},
            url_image3 = ${mysql.escape(url_image3)},
            url_image4 = ${mysql.escape(url_image4)}
            WHERE product_id = ${mysql.escape(product_id)}
            `
           
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            console.log(result);
            if (err) {
                logger.error(`[productService][updateProductImage] errors: `, err)
                return reject(err)
            }
            if(result.affectedRows == 0) {
                return reject(`Not found product with id ${product_id}`);
            }
            
            return resolve(`Upload product-image with id ${product_id} sucessfully`);   
        })
    }
    uploadProductImage(product_id,url_image1,url_image2,url_image3,url_image4){
        return new Promise(async (resolve,reject)=>{
            const query = `INSERT INTO product_image (product_id,url_image1,url_image2,url_image3,url_image4) 
            VALUES (${mysql.escape(product_id)},${mysql.escape(url_image1)},${mysql.escape(url_image2)},${mysql.escape(url_image3)},${mysql.escape(url_image4)})
            `
            console.log(query);
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            console.log(result);
            if (err) {  
                logger.error(`[productService][updateProductImage] errors: `, err)
                return reject(err)
            }
            return  resolve(`Upload product-image with id ${product_id} sucessfully`)
        })
    }
}

module.exports = ProductService;