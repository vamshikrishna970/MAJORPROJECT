module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; // Store the original URL in the session
    req.flash("error", "You must be signed in to do that!");
    return res.redirect("/user/login");
  }
  next();
};