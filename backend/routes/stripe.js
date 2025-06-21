const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // use .env

router.post("/create-checkout-session", async (req, res) => {
  const { listing, total } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: listing.title,
              description: listing.location,
              images: [listing.image], // optional
            },
            unit_amount: total * 100, // amount in paise
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/listing/${listing.id}`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
