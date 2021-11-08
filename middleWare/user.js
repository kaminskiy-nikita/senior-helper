module.exports = (req, res, next) => {
  if (req.path === '/' && (req.session.grandmother || req.session.grandson)) {
    res.redirect('/profile');
  }
  next();
};
