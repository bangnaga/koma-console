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
    Title:'MsbOfflineNew',
    Heading:'MsbOffline',
    Subscriber:{label :'Subscriber'},
    Messageid:{label :'Messageid'},
    Creationdate:{label :'Creationdate'},
    Messagesize:{label :'Messagesize'},
    Stanza:{label :'Stanza'},
    }

router.get('/', sessionChecker, function(req, res, next) {
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
        statusCode:100,
        statusMessage:'',        
        record:{subscriber:'',
        messageid:'',
        creationdate:'',
        messagesize:'',
        stanza:'',
        }
    }
    res.render('MsbOfflineNewPage',parameter);
    console.log(parameter);
});
router.post('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.body;
    parameter = {
        session: req.session,
        cookies: req.cookies,
        resource: appresource,
        dateFormat: dateFormat,
    }    
    dao.newMsbOffline(jsonObj,function(err,rows) {
        if(err==null){
            parameter.statusCode = 200;
            parameter.statusMessage = 'Successfully created';
        }else{
            parameter.statusCode = err.code;
            parameter.statusMessage = err.message;
        }
        parameter.record = jsonObj;
        res.render('MsbOfflineNewPage',parameter);
        console.log(parameter);        
    });
});

module.exports = router;