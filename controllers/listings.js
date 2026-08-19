const mapboxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const Listing = require("../models/listing.js");
const { cloudinary, uploadImage } = require("../cloudConfig.js");

const geocodingClient = process.env.MAP_TOKEN
  ? mapboxGeocoding({ accessToken: process.env.MAP_TOKEN })
  : null;

async function coordinatesFor(location) {
  if (!geocodingClient) return [0, 0];

  const response = await geocodingClient
    .forwardGeocode({ query: location, limit: 1 })
    .send();

  return response.body.features[0]?.geometry?.coordinates || [0, 0];
}

module.exports.index = async (req, res) => {
  const query = (req.query.q || "").trim();
  const filter = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
          { country: { $regex: query, $options: "i" } },
        ],
      }
    : {};
  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", { allListings, query });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", {
    listing,
    mapToken: process.env.MAP_TOKEN || "",
  });
};

module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id;
  listing.geometry = {
    type: "Point",
    coordinates: await coordinatesFor(listing.location),
  };

  if (req.file) {
    listing.image = await uploadImage(req.file);
  }

  await listing.save();
  req.flash("success", "Successfully created a new listing!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });

  listing.geometry = {
    type: "Point",
    coordinates: await coordinatesFor(listing.location),
  };

  if (req.file) {
    const previousFilename = listing.image?.filename;
    listing.image = await uploadImage(req.file);
    if (previousFilename) await cloudinary.uploader.destroy(previousFilename);
  }

  await listing.save();
  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const listing = await Listing.findByIdAndDelete(req.params.id);
  if (listing?.image?.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }
  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};
