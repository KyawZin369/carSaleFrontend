// src/pages/AdminDashboard.js
import React, { useState } from "react";
import Cars from "../page/admin/CarList";
import Users from "../page/admin/User";
import Transactions from "../page/admin/Transaction";
import Bids from "../page/admin/Bid";
import { useMutation } from "@tanstack/react-query";
import { BaseApi } from "../api/BaseApi";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Cars");

  const menuItems = [
    { name: "Cars", component: <Cars /> },
    { name: "Users", component: <Users /> },
    { name: "Transactions", component: <Transactions /> },
    { name: "Bids", component: <Bids /> },
  ];

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const token = sessionStorage.getItem("token");
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
      alert("Logged out successfully!");
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="py-6 text-center text-2xl font-bold border-b border-blue-500">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <div>
          {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-600 ${
                  activeTab === item.name ? "bg-blue-600 font-semibold" : ""
                }`}
              >
                {item.name}
              </button>
          ))}
            </div>
          <button
            className="px-4 py-3 mt-96 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={() => logoutMutation.mutate()}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {menuItems.find((item) => item.name === activeTab)?.component}
      </div>
    </div>
  );
};

export default AdminDashboard;
