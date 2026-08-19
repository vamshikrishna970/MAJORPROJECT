const test = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { isReviewAuthor, validateListing, validateReview } = require("../middlieware.js");

test("listing validation accepts legacy image URLs and uploaded image objects", () => {
  const base = {
    title: "Test stay",
    description: "A valid listing",
    location: "Hyderabad",
    country: "India",
    price: 1200,
  };

  assert.equal(listingSchema.validate({ listing: { ...base, image: "https://example.com/stay.jpg" } }).error, undefined);
  assert.equal(listingSchema.validate({ listing: { ...base, image: { url: "https://example.com/stay.jpg", filename: "stay" } } }).error, undefined);
});

test("review validation enforces the one-to-five rating range", () => {
  assert.equal(reviewSchema.validate({ review: { rating: 5, comment: "Excellent" } }).error, undefined);
  assert.ok(reviewSchema.validate({ review: { rating: 0, comment: "Invalid" } }).error);
  assert.ok(reviewSchema.validate({ review: { rating: 6, comment: "Invalid" } }).error);
});

test("listing imageUrl supports old seed data and new Cloudinary uploads", () => {
  assert.equal(new Listing({ image: "https://example.com/legacy.jpg" }).imageUrl, "https://example.com/legacy.jpg");
  assert.equal(new Listing({ image: { url: "https://example.com/cloud.jpg", filename: "cloud" } }).imageUrl, "https://example.com/cloud.jpg");
});

test("validation middleware advances valid requests", () => {
  let listingNext = false;
  validateListing({ body: { listing: { title: "Stay", description: "Valid", location: "Goa", country: "India", price: 500 } } }, {}, () => { listingNext = true; });
  let reviewNext = false;
  validateReview({ body: { review: { rating: 4, comment: "Good" } } }, {}, () => { reviewNext = true; });
  assert.equal(listingNext, true);
  assert.equal(reviewNext, true);
});

test("review authorization permits only the author", async () => {
  const authorId = new mongoose.Types.ObjectId();
  const originalFindById = Review.findById;
  Review.findById = async () => ({ author: authorId });

  try {
    let authorized = false;
    await isReviewAuthor(
      { params: { id: "listing", reviewId: "review" }, user: { _id: authorId }, flash() {} },
      { redirect() { assert.fail("author should not be redirected"); } },
      () => { authorized = true; }
    );
    assert.equal(authorized, true);

    let redirectUrl;
    await isReviewAuthor(
      { params: { id: "listing", reviewId: "review" }, user: { _id: new mongoose.Types.ObjectId() }, flash() {} },
      { redirect(url) { redirectUrl = url; } },
      () => assert.fail("non-author should not reach next middleware")
    );
    assert.equal(redirectUrl, "/listings/listing");
  } finally {
    Review.findById = originalFindById;
  }
});
