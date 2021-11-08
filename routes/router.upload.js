const router = require('express').Router();
const { v2: uuidv2 } = require('uuid');
const { Grandmother, GrandSon, Image } = require('../db/models/index');
const upload = require('../middleWare/multerVariable');

router.get('/', (req, res) => {
  res.render('upload');
});

router.post('/', upload.single('profile-file'), async (req, res, next) => {
  try {
    const {
      title, description,
    } = req.body;
    const path = req.file.path.replace('public/', '');
    const grandmotherId = req.session.grandmother.id;

    const createImage = await Image.create({
      title,
      path,
      describe: description,
      GrandmotherId: grandmotherId,
    });

    res.redirect('/profile');
  } catch (error) {
    res.status(405).end();
  }
});

module.exports = router;
