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
    Title:'MsbRosterSearch',
    Heading:'MsbRoster',
    Rosterid:{label :'Rosterid'},
    Subscriber:{label :'Subscriber'},
    Jid:{label :'Jid'},
    Sub:{label :'Sub'},
    Ask:{label :'Ask'},
    Recv:{label :'Recv'},
    Nick:{label :'Nick'},
    Key:{label :'Key'},
    MsbRoster:{Heading:'MsbRoster',
        Rosterid:{header:'Rosterid'},
        Subscriber:{header:'Subscriber'},
        Jid:{header:'Jid'},
        Sub:{header:'Sub'},
        Ask:{header:'Ask'},
        Recv:{header:'Recv'},
        Nick:{header:'Nick'},
        Key:{header:'Key'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    if(jsonObj.rowid===undefined) jsonObj.rowid = 0;
    req.session.previouspath = 'searchMsbRoster?'+req._parsedUrl.query;
    dao.searchMsbRoster(jsonObj,function(err,rows) {
        parameter = {
            session: req.session,
            cookies: req.cookies,
            resource: appresource,
            dateFormat: dateFormat,
            records: rows,
        }
        res.render('MsbRosterSearchPage',parameter);
        console.log(parameter);        
    })
});

module.exports = router;
