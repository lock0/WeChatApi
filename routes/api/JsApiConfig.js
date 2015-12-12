/**
 * Created by Ben on 2015/12/1.
 */
var express = require('express');
var router = express.Router();
var authority = require("./../../authority");

router.get('/', function (req, res, next) {
    authority.authorization(req,function(user){
        res.send(user);
    });
});
module.exports = router;