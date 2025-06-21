const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing.js");
const auth = require("../routes/auth.js");

// Create Listing
router.post("/", auth, async (req, res) => {
  try {
    const listing = await Listing.create({ ...req.body, owner: req.user.id });
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Listings
router.get("/", async (req, res) => {
  const listings = await Listing.find().populate("owner", "name email");
  res.json(listings);
});

// Get Single Listing
router.get("/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Not found" });
  res.json(listing);
});

// Update Listing (only owner)
router.put("/:id", auth, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Not found" });

  if (listing.owner.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  Object.assign(listing, req.body);
  await listing.save();
  res.json(listing);
});

// Delete Listing (only owner)
router.delete("/:id", auth, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Not found" });

  if (listing.owner.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await listing.remove();
  res.json({ message: "Deleted" });
});

module.exports = router;
