module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Store the original URL in the session
    req.flash("error", "You must be signed in to do that!");
    return res.redirect("/user/login");
  }
  next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // Make it available in res.locals
    
  }
  next();
};