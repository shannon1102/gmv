'use strict'
const jwt = require('jsonwebtoken')
const logger = require('../logger/index')
const verifyToken = (req,res,next) => {

    const token = req.header['x-acess-token']
    if(!token) {
        logger.error('Token is missing');
        return res.status(401).json({
            message: 'Token is required'
        })
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
        if(err) {
            logger.err('Failed to authenticate token');
            return res.status(401).json({message: 'Failed to authenticate token'})
            req.userId  = decoded.id
            next()
        }
    })

   
}
module.exports = Object.assign({},{verifyToken});