/**
 * Created by Ben on 2015/11/30.
 */
var express = require('express');
var router = express.Router();
var authority = require("./../../authority");

/* GET users listing. */
router.get('/', function (req, res, next) {
    //appid=1&signature=2&random=3&timestamp=4
    //YXBwaWQ9d3g5OTBjMWQzMDFjZTM0YTQ2JnNpZ25hdHVyZT0yJnJhbmRvbT0zJnRpbWVzdGFtcD00
    authority.authority(req,function(result){
        res.send(result);
    });
});
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    db.getBrand(id, function (data) {
        res.send(data);
    });
});
router.post('/', function (req, res, next) {
    res.send(req.body);
});
module.exports = router;