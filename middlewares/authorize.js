const authorize = (req, res, next) => {
  if (!req.session.loggedIn && !req.session.user) {
    res.redirect("/auth");
  } else {
    next();
  }
};

module.exports = authorize;
