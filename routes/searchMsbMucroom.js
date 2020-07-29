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
    Title:'MsbMucroomSearch',
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
    MsbMucroom:{Heading:'MsbMucroom',
        Roomid:{header:'Roomid'},
        Serviceid:{header:'Serviceid'},
        Creationdate:{header:'Creationdate'},
        Modificationdate:{header:'Modificationdate'},
        Name:{header:'Name'},
        Naturalname:{header:'Naturalname'},
        Description:{header:'Description'},
        Lockeddate:{header:'Lockeddate'},
        Emptydate:{header:'Emptydate'},
        Canchangesubject:{header:'Canchangesubject'},
        Maxusers:{header:'Maxusers'},
        Publicroom:{header:'Publicroom'},
        Moderated:{header:'Moderated'},
        Membersonly:{header:'Membersonly'},
        Caninvite:{header:'Caninvite'},
        Roompassword:{header:'Roompassword'},
        Candiscoverjid:{header:'Candiscoverjid'},
        Logenabled:{header:'Logenabled'},
        Subject:{header:'Subject'},
        Rolestobroadcast:{header:'Rolestobroadcast'},
        Usereservednick:{header:'Usereservednick'},
        Canchangenick:{header:'Canchangenick'},
        Canregister:{header:'Canregister'},
        },
    }

router.get('/', sessionChecker, function(req, res, next) {
    var jsonObj = req.query;
    if(jsonObj.rowid===undefined) jsonObj.rowid = 0;
    req.session.previouspath = 'searchMsbMucroom?'+req._parsedUrl.query;
    dao.searchMsbMucroom(jsonObj,function(err,rows) {
        parameter = {
            session: req.session,
            cookies: req.cookies,
            resource: appresource,
            dateFormat: dateFormat,
            records: rows,
        }
        res.render('MsbMucroomSearchPage',parameter);
        console.log(parameter);        
    })
});

module.exports = router;
