/**
 * Created by Ben on 2015/11/30.
 */
var express = require('express');
var router = express.Router();
var db = require("./../../database");
var querystring = require('querystring');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //appid=1&signature=2&random=3&timestamp=4
    //YXBwaWQ9d3g5OTBjMWQzMDFjZTM0YTQ2JnNpZ25hdHVyZT0yJnJhbmRvbT0zJnRpbWVzdGFtcD00
    var base64string = new Buffer(req.headers['authorization'], 'base64').toString('ascii');
    var parm = querystring.parse(base64string);
    var appid= parm.appid;
    db.getUser(appid,function(data){
        res.send(data);
    });
});
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    db.getBrand(id,function(data){
        res.send(data);
    });
});
router.post('/', function(req, res, next) {
    res.send(req.body);
});
module.exports = router;
