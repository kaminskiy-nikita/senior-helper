const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Grandmother, GrandSon } = require('../db/models/index');

router.route('/registration')
  .get((req, res) => {
    res.render('registration', { isGrandson: true });
  })
  .post(async (req, res) => {
    const {
      password, email, grandmotherEmail, username,
    } = req.body;

    try {
      const grandmother = await Grandmother.findOne({
        where: {
          email: grandmotherEmail,
        },
      });
      if (!grandmother) {
        return res.json({ grandmotherEmail: false });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const grandson = await GrandSon.create({
        password: hashedPassword,
        email,
        GrandmotherId: grandmother.id,
        username,
      });
      console.log('granny id', grandson.GrandmotherId);

      req.session.grandson = {
        email: grandson.email,
        grandmotherId: grandmother.id,
        username: grandson.username,
        isGrandson: true,
      };
    } catch (error) {
      console.error(error);
      return res.status(401).end();
    }
    res.json({ registrated: true });
  });

router.route('/login')
  .get((req, res) => {
    res.render('login', { isGrandson: true });
  })
  .post(async (req, res) => {
    const { password, email } = req.body;

    try {
      const grandson = await GrandSon.findOne({
        where: {
          email,
        },
      });
      if (!grandson) {
        return res.status(401).end();
      }
      const isValidPassword = await bcrypt.compare(password, grandson.password);
      if (!isValidPassword) {
        return res.status(401).end();
      }
      req.session.grandson = {
        email: grandson.email,
        grandmotherId: grandson.GrandmotherId,
        username: grandson.username,
        isGrandson: true,
      };
    } catch (error) {
      console.error(error);
      return res.status(401).end();
    }
    res.json({ login: true });
  });

module.exports = router;
