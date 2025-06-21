import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddListing() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_preset_name");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm({ ...form, image: data.secure_url });
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, location, price, image, description } = form;

    if (!title || !location || !price || !image || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to create a listing.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Listing created successfully!");
        setForm({
          title: "",
          location: "",
          price: "",
          image: "",
          description: "",
        });
        navigate("/");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to create listing.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-14 px-6 py-8 bg-[#dfe6e4] rounded-xl shadow-lg"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create a New Listing
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter listing title"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="City, Country"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            type="number"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {form.image && (
            <img
              src={form.image}
              alt="Uploaded"
              className="mt-3 rounded-md shadow w-full h-48 object-cover"
            />
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a few details about your property..."
            rows="4"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition">
          Submit Listing
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AddListing;
