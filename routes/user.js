const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlieware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router.get("/login", userController.renderLoginForm);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/user/login",
    }),
    userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
