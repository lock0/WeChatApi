/**
 * Created by Ben on 2015/12/1.
 */
var db = require("./database");
var querystring = require('querystring');
var util = require('util');
var sha1 = require('sha1');
var request = require("request");

function authority(req, callback) {
    var base64string = new Buffer(req.headers['authorization'], 'base64').toString('ascii');
    var param = querystring.parse(base64string);
    db.getUser(param.appid, function (data) {
        var timestamp = new Date().getTime();
        var user = data[0];
        for (var i = 0; i < 600; i++) {
            var str = util.format('appsecret=%s&random=%s&timestamp=%s', user.AppSecret, param.random, timestamp - i);
            var signature = sha1(str).toUpperCase();
            if (param.signature.toUpperCase() == signature) {
                if (user.GetAccessTokenDateTime == null || (new Date().getTime() - user.GetAccessTokenDateTime.getTime()) > 70000) {
                    var url = util.format("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s", user.AppId, user.AppSecret);
                    request(url, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            user.AccessToken = JSON.parse(body).access_token
                            db.updateUser(user, callback(true));
                        }else{
                            callback(false);
                        }
                    });
                } else {
                    callback(true);
                }
            }else{
                callback(false);
            }
        }
    });
};
exports.authority = authority;