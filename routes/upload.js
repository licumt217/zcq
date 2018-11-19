const express = require('express')
const router = express.Router()
const log4js= require('../config/log-config')
const logger = log4js.getLogger() // 根据需要获取logger
const Response=require('../config/response')
const fs=require('fs')


//
router.post('/', function (req, res) {
    let des_file = __dirname + "/" + req.files[0].originalname;
    logger.info("上传的文件名：",des_file)
    fs.readFile( req.files[0].path, function (err, data) {
        console.log(1)
        if(err){
            logger.info(err)
            res.send(Response.businessException("上传文件失败！"))
        }else{
            console.log(2)
            fs.writeFile(des_file, data, function (err) {
                if( err ){
                    logger.info(err)
                    res.send(Response.businessException("将上传的文件写入磁盘失败！"))
                }else{
                    res.send(Response.success({
                        filename:req.files[0].originalname
                    }))
                }
            });
        }
        
        
    });
})



module.exports = router