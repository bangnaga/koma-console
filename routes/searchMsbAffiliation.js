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
    Title:'MsbAffiliationSearch',
    Heading:'MsbAffiliation',
    Affiliation:{label :'Affiliation'},
    Description:{label :'Description'},
    MsbAffiliation:{Heading:'MsbAffiliation',
        Affiliation:{header:'Affiliation'},
        Description:{header:'Description'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    if(jsonObj.rowid===undefined) jsonObj.rowid = 0;
    req.session.previouspath = 'searchMsbAffiliation?'+req._parsedUrl.query;
    dao.searchMsbAffiliation(jsonObj,function(err,rows) {
        parameter = {
            session: req.session,
            cookies: req.cookies,
            resource: appresource,
            dateFormat: dateFormat,
            records: rows,
        }
        res.render('MsbAffiliationSearchPage',parameter);
        console.log(parameter);        
    })
});

module.exports = router;
