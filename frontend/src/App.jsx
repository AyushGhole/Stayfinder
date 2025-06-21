import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListingDetail from "./pages/ListingDetail";
import "./App.css";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import ProtectedRoute from "./components/ProtectedRoute";
import EditListing from "./pages/EditListing"; // 👈 Add this

import AddListing from "./pages/AddListing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/listing" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/edit-listing/:id" element={<EditListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
