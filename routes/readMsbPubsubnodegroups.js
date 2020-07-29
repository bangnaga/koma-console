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
    Title:'MsbPubsubnodegroupsRead',
    Heading:'MsbPubsubnodegroups',
    Serviceid:{label :'Serviceid'},
    Nodeid:{label :'Nodeid'},
    Rostergroup:{label :'Rostergroup'},
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    jsonObj.rowid = 0;
    req.session.previouspath = 'readMsbPubsubnodegroups?'+req._parsedUrl.query;
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
    }
    var readMsbPubsubnodegroups = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbPubsubnodegroups(jsonObj,function(err,rows) {
                if(err) res.status(err.code).end();
                else{
                    if(rows[0]===undefined) res.redirect('/searchMsbPubsubnodegroups');
                    else{ 
                        jsonObj = rows[0];
                        resolve(jsonObj);
                    }
                }
            });
        },1000);
    });
    
    var sendResult = (results) => {
        console.log(jsonObj)
        parameter.record = jsonObj;        
        res.render('MsbPubsubnodegroupsReadPage',parameter);
    }    
    Promise.all([readMsbPubsubnodegroups]).then(sendResult);
});

module.exports = router;
