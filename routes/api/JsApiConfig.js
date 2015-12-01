/**
 * Created by Ben on 2015/12/1.
 */
var express = require('express');
var router = express.Router();
var db = require("./../../database");

router.get('/', function(req, res, next) {

var header= req.headers['Authorization'];


    db.getBrands(function(data){
        res.send(data);
    });
});
module.exports = router;
