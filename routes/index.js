var express = require('express');
var router = express.Router();
var {isLoggedIn} = require("../middleware/auth");
const { getRecentPosts } = require('../middleware/posts');

/* GET home page. */
router.get('/', getRecentPosts, function (req, res, next) {
  res.render('index', { title: 'CSC 317 App', name: "Alexander Hoff" });
});

router.get("/login", function (req, res) {
  res.render('login', { title: 'Login', css: ["style.css"] });
})

router.get("/registration", function (req, res) {
  res.render('registration', {
    title: 'Registration',
    css: ["style.css"]
  });
})

router.get("/postvideo", isLoggedIn, function (req, res) {
  res.render('postvideo', { title: 'Post a Video', css: ['style.css'] });
})


module.exports = router;
