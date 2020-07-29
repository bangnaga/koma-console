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
    Title:'MsbMucservicepropSearch',
    Heading:'MsbMucserviceprop',
    Serviceid:{label :'Serviceid'},
    Name:{label :'Name'},
    Propvalue:{label :'Propvalue'},
    MsbMucserviceprop:{Heading:'MsbMucserviceprop',
        Serviceid:{header:'Serviceid'},
        Name:{header:'Name'},
        Propvalue:{header:'Propvalue'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    if(jsonObj.rowid===undefined) jsonObj.rowid = 0;
    req.session.previouspath = 'searchMsbMucserviceprop?'+req._parsedUrl.query;
    dao.searchMsbMucserviceprop(jsonObj,function(err,rows) {
        parameter = {
            session: req.session,
            cookies: req.cookies,
            resource: appresource,
            dateFormat: dateFormat,
            records: rows,
        }
        res.render('MsbMucservicepropSearchPage',parameter);
        console.log(parameter);        
    })
});

module.exports = router;
