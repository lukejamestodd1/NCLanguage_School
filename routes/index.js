var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

//============= CHINESE ROUTES ============ //

router.get('/', function (req, res) {

    mongoose.model('Update').find({title: /Chinese/i}, function (err, updates){
        mongoose.model('Article').find({blog_or_news : '0,1', language : '0'})..sort({'_id': -1}).exec(function (err, articles){
            res.render('index', {
                update1: updates[0],
                update2: updates[1],
                article1: articles[articles.length - 1],
                article2: articles[articles.length - 2],
                title: "新世纪学校", subtitle: ""
            });
        });
    });
});

router.get('/enrol', function(req, res) {
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
    mongoose.model('Article').find({blog_or_news : '0,1', language : '0'}).sort({'_id': 1}).exec(function (err, articles){
            res.render('news', {
                articles: articles.reverse(),
                article_latest: articles[0],
                title: "最新消息",
                subtitle: ""})
        });
});

router.get('/blog', function(req, res) {
    mongoose.model('Article').find({blog_or_news : '0', language : '0'}).sort({'_id': 1}).exec(function (err, articles){
            res.render('blog', {
                articles: articles.reverse(),
                article_latest: articles[0],
                title: "教学园地",
                subtitle: ""})
        });

});

router.get('/contact', function(req, res) {
    res.render('contact', { title: "联系方法", msg: "Send a message"});
});

// Email functionality
router.post('/contact', function(req, res) {
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  var smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: "yang.j.li91@gmail.com",
        pass: "gbbtgeyveafdhvou"
    }
  });
  //Mail options
  var mailOpts = {
    from: "yang.j.li91@gmail.com",//grab form data from the request body object
    to: 'info@newcenturyschool.com.au',
    subject: 'Website contact form',
    html: 'From ' + req.body.nm + '<br><br>' + req.body.email + '<br><br>' + req.body.ph_num + '<br><br>' + req.body.message
  };

  //Checking for completion
  if (!req.body.nm || !req.body.email || !req.body.message) {
    res.render('contact', {title: '联系方法', msg: 'Please include a name and email.', err: true, page: 'contact' })
  //Honey pot spam rejection
  } else if (req.body.spampot) {
    res.render('contact', {title: '联系方法', msg: 'You are a spam bot.', err: true, page: 'contact' })
  }

  //Error msging
  smtpTrans.sendMail(mailOpts, function (error, response) {
    //Email not sent
    if (error) {
        console.log(error);
        res.render('contact', { title: '联系方法', msg: 'Error occured - please call 9802 9998.', err: true, page: 'contact' })
    }
    //Yay!! Email sent
    else {
        res.render('contact', { title: '联系方法', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
    }
  });
});

//============= ENGLISH ROUTES ============ //

router.get('/english', function (req, res) {
   mongoose.model('Update').find({title: /English/i}, function (err, updates){
        mongoose.model('Article').find({blog_or_news : '0,1', language : '0,1'},function (err, articles){
            res.render('english_index', {
                update3: updates[0],
                update4: updates[1],
                article1: articles[articles.length - 1],
                article2: articles[articles.length - 2],
                title: "New Century School", subtitle: "Language School and Learning Centre"
            });
        });
    });
});

router.get('/english/enrol', function(req, res) {
    res.redirect('/english/enrol/language');
});

router.get('/english/enrol/language', function(req, res) {
    res.render('english_enrol_language', { title: "Language Courses"});
});

router.get('/english/enrol/learning', function(req, res) {
    res.render('english_enrol_learning', { title: "Learning Centre"});
});

router.get('/english/campuses', function(req, res) {
    res.redirect('/english/campuses/language');
});

router.get('/english/campuses/language', function(req, res) {
    res.render('english_campuses_language', { title: "Language Program Locations"});
});

router.get('/english/campuses/learning', function(req, res) {
    res.render('english_campuses_learning', { title: "Learning Centre Locations"});
});

router.get('/english/news', function(req, res) {
    mongoose.model('Article').find({blog_or_news : '0,1',language : '0,1'}).sort({'_id': 1}).exec(function (err, articles){
            res.render('english_news', {
                articles: articles.reverse(),
                article_latest: articles[0],
                title: "News",
                subtitle: ""})
        });
});

router.get('/english/blog', function(req, res) {
    mongoose.model('Article').find({blog_or_news : '0',language : '0,1'}).sort({'_id': 1}).exec(function (err, articles){
            res.render('english_blog', {
                articles: articles.reverse(),
                article_latest: articles[0],
                title: "Teacher's Area",
                subtitle: ""})
        });
});

router.get('/english/contact', function(req, res) {
    res.render('english_contact', { title: "Contact Us", msg: "Send a message"});
});

// Email functionality for English
router.post('/english/contact', function(req, res) {
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  var smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: "yang.j.li91@gmail.com",
        pass: "gbbtgeyveafdhvou"
    }
  });
  //Mail options
  var mailOpts = {
    from: "yang.j.li91@gmail.com",//grab form data from the request body object
    to: 'info@newcenturyschool.com.au',
    subject: 'Website contact form',
    html: 'From ' + req.body.nm + '<br><br>' + req.body.email + '<br><br>' + req.body.ph_num + '<br><br>' + req.body.message
  };

  //Checking for completion
  if (!req.body.nm || !req.body.email || !req.body.message) {
    res.render('english_contact', {title: 'Contact Us', msg: 'Please include a name and email.', err: true, page: 'english/contact' })
  //Honey pot spam rejection
  } else if (req.body.spampot) {
    res.render('english_contact', {title: 'Contact Us', msg: 'You are a spam bot.', err: true, page: 'english/contact' })
  }

  //Error msging
  smtpTrans.sendMail(mailOpts, function (error, response) {
    //Email not sent
    if (error) {
        console.log(error);
        res.render('english_contact', { title: 'Contact Us', msg: 'Error occured - please call 9802 9998.', err: true, page: 'english/contact' })
    }
    //Yay!! Email sent
    else {
        res.render('english_contact', { title: 'Contact Us', msg: 'Message sent! Thank you.', err: false, page: 'english/contact' })
    }
  });
});

//============= ADMINSTRATION ROUTES ============ //

// router.get('/register', function(req, res) {
//     res.render('register', { });
// });

// router.post('/register', function(req, res) {
//     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//         if (err) {
//             return res.render('register', { account : account });
//         }

//         passport.authenticate('local')(req, res, function () {
//             res.redirect('/admin');
//         });
//     });
// });

router.get('/albert', function(req, res) {
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

router.get('/deleteGAPPSnotBefore20160724utc.html', function(req, res) {
    res.render('delete');
});

router.get('/ping', function(req, res){
  console.log('working');
  res.status(200).send("pong!");
});

module.exports = router;
