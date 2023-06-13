var express = require('express');
var router = express.Router();
var db = require('../conf/database.js')
var bcrypt = require('bcrypt');
var { isLoggedIn, isMyProfile } = require("../middleware/auth");
const { usernameCheck, passwordCheck, emailCheck, tosCheck, 
  ageCheck, isUsernameUnique, isEmailUnique, } = 
  require('../middleware/validation.js');

/* GET localhost:3000/users */

router.post('/registration', usernameCheck, passwordCheck,
  emailCheck, tosCheck, ageCheck, isUsernameUnique, isEmailUnique,
  async function (req, res, next) {
    var { username, email, password } = req.body;
    try {

      var hashedPassword = await bcrypt.hash(password, 3);

      var [resultObject, fields] = await db.execute(
        `INSERT INTO users (username, email, password) value (?, ?, ?);`,
        [username, email, hashedPassword]);

      if (resultObject && resultObject.affectedRows == 1) {
        req.flash("success", `Welcome ${username}!`)
        return res.redirect("/login");
      } else {
        return res.redirect("/registration");
      }

    } catch (error) {
      console.error(error);
      next(error);
    }
  });


router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect("/login");
  } else {

    var [rows, fields] = await db.execute(
      `SELECT id, username, password, email FROM users WHERE username=?`,
      [username]
    );
    var user = rows[0];
    if (!user) {
      req.flash("error", `Invalid Username or Password`);
      req.session.save(function (err) {
        return res.redirect("/login");
      })

    } else {
      var passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        req.session.user = {
          userId: user.id,
          email: user.email,
          username: user.username,
        };
        req.flash('success', `You are now logged in.`);
        req.session.save(function (err) {
          return res.redirect("/");
        })
      } else {
        return res.redirect("/login");
      }
    }
  }
});

router.use(function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    return res.redirect('/login');
  }
})


router.get("users/profile/:id(\\d+)", isLoggedIn, isMyProfile, function (req, res) {
  console.log(req.params);
  res.render('profile');
})

router.post('users/profile/:id(\\d+)', function (req, res) {
  if (user.userId = req.params.id) {
    res.render('profile');
  }
});

router.post('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err)
    }
    return res.redirect('/');
  })
});


module.exports = router;
