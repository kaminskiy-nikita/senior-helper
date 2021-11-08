const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Grandmother } = require('../db/models/index');

router.route('/registration')
  .get((req, res) => {
    res.render('registration', { isGrandmother: true });
    console.log('reg granny');
  })
  .post(async (req, res) => {
    const { password, email, username } = req.body;
    console.log(password, email, username);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const grandmother = await Grandmother.create({ password: hashedPassword, email, username });
      req.session.grandmother = {
        email: grandmother.email,
        id: grandmother.id,
        username: grandmother.username,
        isGrandmother: true,
      };
      res.locals.isGrandmother = true;
    } catch (error) {
      console.error(error);
      return res.status(401).end();
    }
    res.json({ registrated: true });
  });

router.route('/login')
  .get((req, res) => {
    res.render('login', { isGrandmother: true });
    console.log('log granny');
  })
  .post(async (req, res) => {
    const { password, email } = req.body;

    try {
      const grandmother = await Grandmother.findOne({
        where: {
          email,
        },
      });
      if (!grandmother) {
        return res.status(401).end();
      }
      const isValidPassword = await bcrypt.compare(password, grandmother.password);
      if (!isValidPassword) {
        return res.status(401).end();
      }
      req.session.grandmother = {
        email: grandmother.email,
        id: grandmother.id,
        username: grandmother.username,
        isGrandmother: true,
      };
      res.locals.isGrandmother = true;
    } catch (error) {
      console.error(error);
      return res.status(401).end();
    }
    res.json({ login: true });
  });

module.exports = router;
