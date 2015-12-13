/**
 * Created by Ben on 2015/12/1.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send(req.user);
});
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    res.send(id);
});
module.exports = router;