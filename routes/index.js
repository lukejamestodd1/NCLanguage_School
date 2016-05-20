var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var mongoose = require('mongoose');

//============= CHINESE ROUTES ============ //

router.get('/', function (req, res) {

    mongoose.model('Update').find(function (err, updates){
        mongoose.model('Article').find({blog_or_news : '0,1'},function (err, articles){
            res.render('index', {
                update1: updates[updates.length - 1], 
                update2: updates[updates.length - 2], 
                article1: articles[articles.length - 1], 
                article2: articles[articles.length - 2], 
                title: "新世纪学校", subtitle: ""
            });
        });
    });
});

router.get('/enrol', function(req, res) {
    //res.render('enrol', { title: "Enrolments - Chinese"});
    res.redirect('/enrol/language');
});

router.get('/enrol/language', function(req, res) {
    res.render('enrol_language', { title: "中文学校报名"});
});

router.get('/enrol/learning', function(req, res) {
    res.render('enrol_learning', { title: "教育中心报名"});
});

router.get('/campuses', function(req, res) {
    //res.render('campuses', { title: "Campuses - Chinese"});
    res.redirect('/campuses/language');
});

router.get('/campuses/language', function(req, res) {
    res.render('campuses_language', { title: "中文学校分校"});
});

router.get('/campuses/learning', function(req, res) {
    res.render('campuses_learning', { title: "教育中心分校"});
});

router.get('/news', function(req, res) {
    mongoose.model('Article').find({blog_or_news : '0,1'}, function (err, articles){
            res.render('news', {
                articles: articles.reverse(), 
                article_latest: articles[0],
                title: "最新消息",
                subtitle: ""})
        });
});

router.get('/blog', function(req, res) {
    mongoose.model('Article').find({blog_or_news : '0'}, function (err, articles){
            res.render('blog', {
                articles: articles.reverse(), 
                article_latest: articles[0],
                title: "教学园地",
                subtitle: ""})
        });

});

router.get('/contact', function(req, res) {
    res.render('contact', { title: "联系方法"});
});

//============= ENGLISH ROUTES ============ //

router.get('/english', function (req, res) {
    mongoose.model('Update').find(function (err, updates){
        res.render('english_index', {updates: updates, title: "New Century School", subtitle: "Chinese language courses and learning centre"});
        });
    //res.render('english_index', { user : req.user });
});

router.get('/english/enrol', function(req, res) {
    res.render('english_enrol', { title: "Enrolments"});
});

router.get('/english/enrol/language', function(req, res) {
    res.render('english_enrol_language', { title: "Language Courses"});
});

router.get('/english/enrol/learning', function(req, res) {
    res.render('english_enrol_learning', { title: "Learning Centre"});
});

router.get('/english/campuses', function(req, res) {
    res.render('english_campuses', { title: "Campuses"});
});

router.get('/english/campuses/language', function(req, res) {
    res.render('english_campuses_language', { title: "Language Program Locations"});
});

router.get('/english/campuses/learning', function(req, res) {
    res.render('english_campuses_learning', { title: "Learning Centre Locations"});
});

router.get('/english/contact', function(req, res) {
    res.render('english_contact', { title: "Contact"});
});

//============= ADMINSTRATION ROUTES ============ //

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/admin');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/admin');
});

router.get('/admin', function(req, res) {
    if (req.user) {
    // logged in
    res.render('admin_index', { user : req.user , title: 'Admin Area'});
    }
    else {
    // not logged in
    res.redirect('/');
    }   
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
  console.log('working');
  res.status(200).send("pong!");
});

module.exports = router;
