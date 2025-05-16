// middleware/is-signed-in.js

const isSignedIn = (req, res, next) => {
  if (req.session.user) return next();

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.redirect('/auth/sign-in');
};

module.exports = isSignedIn;
