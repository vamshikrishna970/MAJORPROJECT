const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/reviews.js");
const {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} = require("../middlieware.js");


//reviews
//post route for creating a new review for a listing
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);


//Delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
