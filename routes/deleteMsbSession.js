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
    Title:'MsbSessionDelete',
    Heading:'MsbSession',
    Sessionid:{label :'Sessionid'},
    Subscriber:{label :'Subscriber'},
    Domain:{label :'Domain'},
    Ipaddress:{label :'Ipaddress'},
    Ipport:{label :'Ipport'},
    Protocol:{label :'Protocol'},
    Starttime:{label :'Starttime'},
    Endtime:{label :'Endtime'},
    Resource:{label :'Resource'},
    Presence:{label :'Presence'},
    Status:{label :'Status'},
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
    }
    dao.deleteMsbSession(jsonObj,function(err,rows) {
        if(err==null){
            parameter.statusCode = 200;
            parameter.statusMessage = 'Successfully created';
        }else{
            parameter.statusCode = err.code;
            parameter.statusMessage = err.message;
        }
        res.redirect(req.session.previouspath);
        console.log(parameter);        
    });
});

module.exports = router;