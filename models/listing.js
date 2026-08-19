const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const defaultImage = {
  url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=80",
  filename: "wanderlust/default-listing",
};

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // Mixed keeps older seeded URL strings readable while new uploads use
  // the course's { url, filename } Cloudinary shape.
  image: { type: Schema.Types.Mixed, default: () => ({ ...defaultImage }) },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
});

listingSchema.virtual("imageUrl").get(function imageUrl() {
  return typeof this.image === "string"
    ? this.image
    : this.image?.url || defaultImage.url;
});

listingSchema.set("toJSON", { virtuals: true });


listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
  await Review.deleteMany({_id: { $in: listing.reviews,}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
