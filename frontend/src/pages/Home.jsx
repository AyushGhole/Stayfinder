import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchListings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/listings");
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      setListings(data);
    } catch (err) {
      setError("Error fetching listings.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      const res = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setListings((prev) => prev.filter((listing) => listing._id !== id));
        alert("Listing deleted.");
      } else {
        alert("Failed to delete listing.");
      }
    } catch (err) {
      console.error("Error deleting:", err);
      alert("An error occurred.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading listings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dfe6e4] py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        All Listings
      </h1>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <Link to={`/listing/${listing.id}`} key={listing.id}>
              <motion.div
                key={listing._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}>
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-68 w-full object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {listing.title}
                  </h2>
                  <p className="text-sm text-gray-500">{listing.location}</p>
                  <p className="mt-2 text-blue-600 font-bold">
                    ₹{listing.price} / night
                  </p>

                  {/* Edit & Delete Options */}
                  <div className="flex justify-end gap-4 mt-4">
                    <Link
                      to={`/edit-listing/${listing._id}`}
                      className="text-sm text-yellow-600 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="text-sm text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
