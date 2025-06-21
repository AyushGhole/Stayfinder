import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation(); // gets passed from ListingDetail

  if (!state)
    return <div className="text-center py-20">No booking data found.</div>;

  const { listing, total, startDate, endDate } = state;

  const handlePayment = () => {
    // Simulate success
    alert("Payment Successful! Booking Confirmed 🎉");
    navigate("/"); // redirect to homepage or bookings
  };

  return (
    <motion.div
      className="min-h-screen bg-[#f9f9f9] px-6 py-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Payment Details
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Listing:</strong> {listing.title}
          </p>
          <p>
            <strong>Location:</strong> {listing.location}
          </p>
          <p>
            <strong>From:</strong> {new Date(startDate).toDateString()}
          </p>
          <p>
            <strong>To:</strong> {new Date(endDate).toDateString()}
          </p>
          <p>
            <strong>Total:</strong> ₹{total}
          </p>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Card Number
          </label>
          <input
            type="text"
            placeholder="4242 4242 4242 4242"
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
          <button
            onClick={handlePayment}
            className="bg-blue-600 w-full text-white py-2 rounded-md hover:bg-blue-700 transition">
            Pay Now ₹{total}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Payment;
