const router = require('express').Router();

router.route('/')
  .get((req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('user_sid');

      return res.redirect('/');
    });
  });

module.exports = router;
