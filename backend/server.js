const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const stripeRoutes = require("./routes/stripe");
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listings");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/stripe", stripeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB connection error", err));

// Routes
app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
