'use strict'
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express')
const logger = require('./logger')
const bodyParser = require('body-parser')

require('dotenv').config({path: path.join(__dirname, '.env')})
const {verifyToken,adminRole} = require('./middleware/verifyToken')

const app = express();
app.use(bodyParser.json())
app.use(morgan('combined', {
    stream: logger.stream
}))

const backendRoute = express.Router();

const indexApi = require('./apis/index');
const postApi = require('./apis/post/postApi');
const productApi = require('./apis/product/productApi');
const hotProductApi = require('./apis/hot_product/hotProductApi');
const catergoryApi = require('./apis/catergory/catergoryApi');
const mainCatergoryApi = require('./apis/main_catergory/mainCatergoryApi');
const inquiryApi = require('./apis/inquiry/inquiryApi');
const userApi = require('./apis/auth/userApi');

backendRoute.use('/', indexApi);
backendRoute.use('/post',postApi);
backendRoute.use('/product',productApi);
backendRoute.use('/hot-product',hotProductApi);
backendRoute.use('/catergory',catergoryApi);
backendRoute.use('/main-catergory',mainCatergoryApi);
backendRoute.use('/inquiry',verifyToken,adminRole,inquiryApi);
backendRoute.use('/user',userApi);
    
app.use('/api', backendRoute);




const swaggerDocument = require('./swagger.json');

backendRoute.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} -${req.method} - ${req.ip}`)

    res.status(err.status || 500)

    res.send(err)
})

module.exports = Object.assign({},{app});