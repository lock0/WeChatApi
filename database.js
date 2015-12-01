/**
 * Created by Ben on 2015/11/30.
 */
var sql = require("mssql");
var dbconfig = {
    server: "mangoeasy.com",
    database: "WeChatService",
    user: "sa",
    password: "",
    port: 1433
};

function getBrands(callback){
    var conn = new sql.Connection(dbconfig);
    var req = new sql.Request(conn);
    conn.connect().then(function () {
        req.query("select * from Brands").then(function (recode) {
            callback(recode);
            conn.close();
        }).catch(function(err) {
            callback(err);
            conn.close();
        });
    }).catch(function (err) {
       return err;
    });
}
function getBrand(id,callback){
    var conn = new sql.Connection(dbconfig);
    var req = new sql.Request(conn);
    req.input('id', sql.NVarChar(), id);
    conn.connect().then(function () {
        req.query('select * from Brands where Id =@id').then(function (recode) {
            callback(recode);
            conn.close();
        }).catch(function(err) {
            callback(err);
            conn.close();
        });
    }).catch(function (err) {
        return err;
    });
}
exports.getBrands = getBrands;
exports.getBrand = getBrand;
