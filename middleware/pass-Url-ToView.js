const passUrlToView = (req, res, next) => {
  res.locals.currentUrl = req.url; // Make req.url available in all EJS templates
  // console.log(res.locals)
  // console.log(req.url)
  next();
}

module.exports = passUrlToView