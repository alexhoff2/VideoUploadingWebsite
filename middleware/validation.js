const db = require('../conf/database');

module.exports = {
  usernameCheck: function (req, res, next) {
    let { username } = req.body;
    username = username.trim();

    if (username.length < 3) {
      req.flash('error', 'Username must be 3 characters or more.');
    }

    if (!/^[a-zA-Z]/.test(username.charAt(0))) {
      req.flash('error', 'Username must start with a letter.');
    }

    if (req.session.flash.error) {
      return res.redirect('/registration');
    }

    next();
  },

  emailCheck: function (req, res, next) {
    const { email } = req.body;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      req.flash('error', 'Must be a valid email.');
      return res.redirect('/registration');
    }

    next();
  },

  passwordCheck: function (req, res, next) {
    const { password } = req.body;
    // Implement  password validation logic here

    next();
  },

  tosCheck: function (req, res, next) {
    const { TOS } = req.body;
    // Implement  terms of service validation logic here

    next();
  },

  ageCheck: function (req, res, next) {
    const { age } = req.body;
    // Implement your age validation logic here

    next();
  },

  isUsernameUnique: async function (req, res, next) {
    const { username } = req.body;

    try {
      const [rows, fields] = await db.execute(
        'SELECT id FROM users WHERE username=?',
        [username]
      );

      if (rows && rows.length > 0) {
        req.flash('error', `${username} is already taken`);
        return res.redirect('/registration');
      }

      next();
    } catch (error) {
      next(error);
    }
  },

  isEmailUnique: async function (req, res, next) {
    const { email } = req.body;

    try {
      const [rows, fields] = await db.execute(
        'SELECT id FROM users WHERE email=?',
        [email]
      );

      if (rows && rows.length > 0) {
        req.flash('error', 'Email is already taken.');
        return res.redirect('/registration');
      }

      next();
    } catch (error) {
      next(error);
    }
  },
};
