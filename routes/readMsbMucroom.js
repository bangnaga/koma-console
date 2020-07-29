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
    Title:'MsbMucroomRead',
    Heading:'MsbMucroom',
    Roomid:{label :'Roomid'},
    Serviceid:{label :'Serviceid'},
    Creationdate:{label :'Creationdate'},
    Modificationdate:{label :'Modificationdate'},
    Name:{label :'Name'},
    Naturalname:{label :'Naturalname'},
    Description:{label :'Description'},
    Lockeddate:{label :'Lockeddate'},
    Emptydate:{label :'Emptydate'},
    Canchangesubject:{label :'Canchangesubject'},
    Maxusers:{label :'Maxusers'},
    Publicroom:{label :'Publicroom'},
    Moderated:{label :'Moderated'},
    Membersonly:{label :'Membersonly'},
    Caninvite:{label :'Caninvite'},
    Roompassword:{label :'Roompassword'},
    Candiscoverjid:{label :'Candiscoverjid'},
    Logenabled:{label :'Logenabled'},
    Subject:{label :'Subject'},
    Rolestobroadcast:{label :'Rolestobroadcast'},
    Usereservednick:{label :'Usereservednick'},
    Canchangenick:{label :'Canchangenick'},
    Canregister:{label :'Canregister'},
    MsbMucaffiliation:{Heading:'MsbMucaffiliation',
        Roomid:{header:'Roomid'},
        Jid:{header:'Jid'},
        Affiliation:{header:'Affiliation'},
        },
    MsbMucmember:{Heading:'MsbMucmember',
        Roomid:{header:'Roomid'},
        Jid:{header:'Jid'},
        Subscriber:{header:'Subscriber'},
        Nickname:{header:'Nickname'},
        Firstname:{header:'Firstname'},
        Lastname:{header:'Lastname'},
        Url:{header:'Url'},
        Email:{header:'Email'},
        Faqentry:{header:'Faqentry'},
        },
    MsbMucroomprop:{Heading:'MsbMucroomprop',
        Roomid:{header:'Roomid'},
        Name:{header:'Name'},
        Propvalue:{header:'Propvalue'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    jsonObj.rowid = 0;
    req.session.previouspath = 'readMsbMucroom?'+req._parsedUrl.query;
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
    }
    var readMsbMucroom = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbMucroom(jsonObj,function(err,rows) {
                if(err) res.status(err.code).end();
                else{
                    if(rows[0]===undefined) res.redirect('/searchMsbMucroom');
                    else{ 
                        jsonObj = rows[0];
                        resolve(jsonObj);
                    }
                }
            });
        },1000);
    });
    
    var msbMucaffiliation = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbMucroom(jsonObj,function(err,rows) {
                jsonObj = rows[0];
                dao.readMsbMucroomMsbMucaffiliation(jsonObj,function(err,rows) {
                    jsonObj.msbMucaffiliation = rows;
                    resolve(jsonObj);
                });
            });        
        },1000);
    });
    
    var msbMucmember = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbMucroom(jsonObj,function(err,rows) {
                jsonObj = rows[0];
                dao.readMsbMucroomMsbMucmember(jsonObj,function(err,rows) {
                    jsonObj.msbMucmember = rows;
                    resolve(jsonObj);
                });
            });        
        },1000);
    });
    
    var msbMucroomprop = new Promise((resolve, reject) => {
        setTimeout(() => {
            dao.readMsbMucroom(jsonObj,function(err,rows) {
                jsonObj = rows[0];
                dao.readMsbMucroomMsbMucroomprop(jsonObj,function(err,rows) {
                    jsonObj.msbMucroomprop = rows;
                    resolve(jsonObj);
                });
            });        
        },1000);
    });
    
    var sendResult = (results) => {
        console.log(jsonObj)
        parameter.record = jsonObj;        
        res.render('MsbMucroomReadPage',parameter);
    }    
    Promise.all([readMsbMucroom,msbMucaffiliation,msbMucmember,msbMucroomprop]).then(sendResult);
});

module.exports = router;
