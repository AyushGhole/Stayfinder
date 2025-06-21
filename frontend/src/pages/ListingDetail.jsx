import { useParams } from "react-router-dom";
import listings from "../data/listings";
import { motion } from "framer-motion";
import { DateRange } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css
import "react-date-range/dist/theme/default.css"; // theme css
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "../components/ProtectedRoute";

function ListingDetail() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === parseInt(id));

  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  if (!listing) return <p className="text-center mt-10">Listing not found</p>;

  const nights = differenceInDays(dateRange[0].endDate, dateRange[0].startDate);

  const total = nights * listing.price;

  const stripePromise = loadStripe(
    "pk_test_51RaHB62EasonrKFtF7CvTvxBzkc2NqolKNfN2iyRUlhwyrZH8lmFEQTuQiJhCHYN2OPWsBep9I7Zt19ecmE8Ls7c00UcpqGUko"
  );

  const handleBooking = async () => {
    const res = await fetch(
      "http://localhost:5000/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing,
          total,
        }),
      }
    );

    const data = await res.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <motion.div
      className="min-h-screen bg-[#f9f9f9] px-6 py-10"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{listing.title}</h1>
          <p className="text-gray-500">{listing.location}</p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
            tincidunt justo. Suspendisse potenti.
          </p>

          {/* Calendar Picker */}
          <div className="mt-6">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              className="rounded-md shadow-md"
              minDate={new Date()}
            />
          </div>

          {/* Booking Summary */}
          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="text-blue-600 font-semibold text-xl">
                ₹{listing.price} / night
              </p>
              <p className="text-gray-600">
                Total for {nights} night{nights > 1 ? "s" : ""}:{" "}
                <strong>₹{total}</strong>
              </p>
            </div>

            <button
              onClick={handleBooking}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ListingDetail;
