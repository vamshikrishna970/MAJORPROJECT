const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
  await mongoose.connect(MONGO_URL);

  // Convert any image objects to a string URL so they match the Listing schema.
  const listings = initData.data.map((listing) => ({
    ...listing,
    image:
      listing.image && typeof listing.image === "object"
        ? listing.image.url
        : listing.image,
  }));

  await Listing.deleteMany({});
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