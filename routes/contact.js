var express = require('express');
var router = express.Router();
var ContactsModel = require('../models/ContactsModel');


router.get('/list/write',function(req, res){
    res.render('contact/form');
});

router.get('/list', function (req,res){
    ContactsModel.find(function(err,items){
        res.render('contact/list',{items:items}); // DB
    });
});

router.post('/list/write', function (req,res){
    var contact = new ContactsModel({
        name: req.body.name,
        title: req.body.title,
        description: req.body.description
    });
    contact.save(function(err){
        res.redirect('/contact/list');
    });
});


module.exports = router;