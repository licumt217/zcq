const express = require('express')
const router = express.Router()
const Response=require('../config/response')

router.get('/', function (req, res) {
    res.send(Response.businessException("地址不正确，请勿直接访问根目录！"))
})

module.exports = router