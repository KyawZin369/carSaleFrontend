// src/pages/AdminDashboard.js
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <div className="border p-4 mb-4 rounded-lg">
        <h3 className="text-xl">Registered Users</h3>
        {/* List of Users */}
        <ul>
          <li>User 1</li>
          <li>User 2</li>
        </ul>
      </div>
      <div className="border p-4 rounded-lg">
        <h3 className="text-xl">Manage Car Posts</h3>
        {/* List of Car Posts */}
        <ul>
          <li>Car 1 - Delete</li>
          <li>Car 2 - Delete</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
