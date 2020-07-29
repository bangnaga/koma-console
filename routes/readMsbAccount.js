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
    Title:'MsbAccountRead',
    Heading:'MsbAccount',
    Username:{label :'Username'},
    Password:{label :'Password'},
    Account:{label :'Account'},
    Email:{label :'Email'},
    Phone:{label :'Phone'},
    Mobile:{label :'Mobile'},
    Enabled:{label :'Enabled'},
    Token:{label :'Token'},
    MsbAuthorities:{Heading:'MsbAuthorities',
        Username:{header:'Username'},
        Authority:{header:'Authority'},
        },
    MsbPersistentLogins:{Heading:'MsbPersistentLogins',
        Username:{header:'Username'},
        Series:{header:'Series'},
        Token:{header:'Token'},
        LastUsed:{header:'LastUsed'},
        },
    MsbSubscriber:{Heading:'MsbSubscriber',
        Subscriber:{header:'Subscriber'},
        Password:{header:'Password'},
        Name:{header:'Name'},
        Email:{header:'Email'},
        Creationdate:{header:'Creationdate'},
        Modificationdate:{header:'Modificationdate'},
        Subtype:{header:'Subtype'},
        Account:{header:'Account'},
        Userkey:{header:'Userkey'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    jsonObj.rowid = 0;
    req.session.previouspath = 'readMsbAccount?'+req._parsedUrl.query;
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
    }
    var readMsbAccount = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbAccount(jsonObj,function(err,rows) {
                if(err) res.status(err.code).end();
                else{
                    if(rows[0]===undefined) res.redirect('/searchMsbAccount');
                    else{ 
                        jsonObj = rows[0];
                        resolve(jsonObj);
                    }
                }
            });
        },1000);
    });
    
    var msbAuthorities = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbAccount(jsonObj,function(err,rows) {
                jsonObj = rows[0];
                dao.readMsbAccountMsbAuthorities(jsonObj,function(err,rows) {
                    jsonObj.msbAuthorities = rows;
                    resolve(jsonObj);
                });
            });        
        },1000);
    });
    
    var msbPersistentLogins = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbAccount(jsonObj,function(err,rows) {
                jsonObj = rows[0];
                dao.readMsbAccountMsbPersistentLogins(jsonObj,function(err,rows) {
                    jsonObj.msbPersistentLogins = rows;
                    resolve(jsonObj);
                });
            });        
        },1000);
    });
    
    var msbSubscriber = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbAccount(jsonObj,function(err,rows) {
                jsonObj = rows[0];
                dao.readMsbAccountMsbSubscriber(jsonObj,function(err,rows) {
                    jsonObj.msbSubscriber = rows;
                    resolve(jsonObj);
                });
            });        
        },1000);
    });
    
    var sendResult = (results) => {
        console.log(jsonObj)
        parameter.record = jsonObj;        
        res.render('MsbAccountReadPage',parameter);
    }    
    Promise.all([readMsbAccount,msbAuthorities,msbPersistentLogins,msbSubscriber]).then(sendResult);
});

module.exports = router;
