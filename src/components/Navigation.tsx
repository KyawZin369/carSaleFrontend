import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { BaseApi } from "../api/BaseApi";

interface Prop {
  token?: string | null;
  userId?: string | null;
}

const Navigation = ({ token, userId }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // React Query Logout Mutation using fetch
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BaseApi}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
    },
    onSuccess: () => {
      sessionStorage.removeItem("token");
      setIsOpen(false);
      alert("Logged out successfully!");
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            🚗 Used Car Sales
          </Link>
        </h1>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          <Link to="/about-us" className="hover:text-yellow-300 transition duration-300">About</Link>
          <Link to="/contact-us" className="hover:text-yellow-300 transition duration-300">Contact</Link>
          <Link to="/faq" className="hover:text-yellow-300 transition duration-300">FAQ</Link>
        </div>

        {/* Auth Section */}
        {!token ? (
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 bg-yellow-400 text-indigo-900 font-semibold rounded shadow hover:bg-yellow-300 transition duration-300">
              Register
            </Link>
          </div>
        ) : (
          <div className="relative">
            {/* Profile Button */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 bg-white text-gray-800 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-blue-100 transition duration-200"
            >
              <FaUserCircle className="text-3xl" />
              <span>Profile</span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute z-30 right-0 mt-2 w-48 bg-white shadow-lg rounded-xl py-2">
                <Link to={`/profile/${userId}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                  View Profile
                </Link>
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Logout Confirmation Modal */}
            {isOpen && (
              <div className="fixed z-30 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white rounded-xl p-6 shadow-lg w-80 text-center">
                  <h2 className="text-lg font-semibold">Confirm Logout</h2>
                  <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>

                  <div className="mt-4 flex justify-center gap-4">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      onClick={() => logoutMutation.mutate()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
