const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
  await mongoose.connect(MONGO_URL);

  if (process.env.NODE_ENV === "production") {
    throw new Error("Refusing to replace production data with development seed data");
  }

  const username = process.env.SEED_USERNAME || "wanderlust-demo";
  const password = process.env.SEED_PASSWORD || "demo-password";
  let owner = await User.findOne({ username });
  if (!owner) {
    owner = await User.register(
      new User({ username, email: `${username}@example.com` }),
      password
    );
  }

  const listings = initData.data.map((listing) => ({
    ...listing,
    owner: owner._id,
  }));

  await Listing.deleteMany({});
  await Review.deleteMany({});
  await Listing.insertMany(listings);

  console.log("data was initialized");

  // Close the connection when finished.
  await mongoose.connection.close();
  console.log("connection closed");
}

initDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
