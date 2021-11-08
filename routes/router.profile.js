const fs = require('fs').promises;
const path = require('path');
const router = require('express').Router();
const { Grandmother, GrandSon, Image } = require('../db/models/index');

router.get('/', async (req, res) => {
  let grandmotherId;
  let isGrandmotherSession;
  let username;

  if (req.session.grandmother) {
    grandmotherId = req.session.grandmother.id;
    isGrandmotherSession = true;
    username = req.session.grandmother.username;
  } else if (req.session.grandson) {
    grandmotherId = req.session.grandson.grandmotherId;
    username = req.session.grandson.username;
  }
  const imageforSonFromDB = await Image.findAll({
    where: {
      GrandmotherId: grandmotherId,
    },
    raw: true,
  });

  res.render('profile', { images: imageforSonFromDB, isGrandmotherSession, username });
});

router.delete('/', async (req, res) => {
  const { imgId, imgPath } = req.body;
  console.log(imgPath);
  await Image.destroy({ where: { id: +imgId } });
  const filePath = path.join(__dirname, '../public/', imgPath);
  await fs.unlink(filePath);
  res.json({ isDeleted: true });
});

module.exports = router;
