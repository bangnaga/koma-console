/*
 * script route generated by KOMA
 * @author : Yan Yan Purdiansah
 */    
var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');    
var database = require('./dao');
var dao = new database.Dao();    
var sessionChecker = require('./security');
var appresource = {
    Title:'MsbRevenueWrite',
    Heading:'MsbRevenue',
    Subscriber:{label :'Subscriber'},
    Account:{label :'Account'},
    From:{label :'From'},
    To:{label :'To'},
    Debit:{label :'Debit'},
    Credit:{label :'Credit'},
    Description:{label :'Description'},
    Activity:{label :'Activity'},
    Datetime:{label :'Datetime'},
    Status:{label :'Status'},
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
        statusCode:100,
        statusMessage:'',
    }
    dao.readMsbRevenue(jsonObj,function(err,rows) {
        parameter.record = rows[0];
        res.render('MsbRevenueWritePage',parameter);
        console.log(parameter);        
    });
});
router.post('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.body;
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,        
    }
    dao.writeMsbRevenue(jsonObj,function(err,rows) {    
        if(err==null){
            parameter.statusCode = 200;
            parameter.statusMessage = 'Successfully created';
        }else{
            parameter.statusCode = err.code;
            parameter.statusMessage = err.message;
        }
        parameter.record = jsonObj;
        res.render('MsbRevenueWritePage',parameter);
        console.log(parameter);        
    });
});

module.exports = router;
