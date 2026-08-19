const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn,isOwner, validateListing } = require("../middlieware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const ExpressError = require("../utils/ExpressError.js");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpeg", "image/webp"].includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new ExpressError(400, "Only PNG, JPEG, and WebP images are allowed"));
  },
});



//Index Route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
