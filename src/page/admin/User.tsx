import React, { useState, ChangeEvent } from "react";
import { BaseApi } from "../../api/BaseApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

// Define the user type based on the API response
interface User {
  id: number;
  email: string;
  name: string;
}

// const fetchUsers = async (): Promise<User[]> => {
//   const token = sessionStorage.getItem('token');
//   const response = await fetch(`${BaseApi}/user`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.statusText}`);
//   }

//   // Ensure the API returns an array of users
//   const data = await response.json();
//   if (!Array.isArray(data)) {
//     throw new Error('Invalid API response: Expected an array');
//   }

//   return data;
// };

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${BaseApi}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await response.json();
      return data.user;
    },
  });

  // Handle search input changes
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  console.log("user" + JSON.stringify(user, null, 2));

  // Filter users based on search term
  const filteredUsers = Array.isArray(user)
    ? user.filter(
        (u) =>
          u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email..."
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* User Listings Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border border-gray-300">Email</th>
              <th className="p-4 border border-gray-300">Name</th>
              <th className="p-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-300">{user.email}</td>
                  <td className="p-4 border border-gray-300">{user.name}</td>
                  <td className="p-4 border border-gray-300">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => {
                        navigate(`profile/${user.id}`);
                      }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
