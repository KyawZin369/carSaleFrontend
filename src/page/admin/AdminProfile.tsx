import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "../../components/Navigation";
import { BaseApi } from "../../api/BaseApi";

type User = {
  id: 5;
  name: string;
  email: string;
  profile_details: string | null;
  is_admin: 0;
};

const AdminProfile = () => {
  const navigate = useNavigate();
  const param = useParams();

  const userId = param.id;

  const fetchUserDetails = async (): Promise<User> => {
    if (!userId) {
      throw new Error("User ID is not defined.");
    }

    const response = await fetch(`${BaseApi}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Fetch error details:", error);
      throw new Error(error.message || "Failed to fetch user details");
    }

    const data = await response.json();

    console.log("raw data:", data);

    // if (!data || typeof data !== "object" || !data.name || !data.email) {
    //   throw new Error(
    //     "Unexpected response format: Missing required user fields"
    //   );
    // }

    return data.user as User;
  };

  const {
    data: usersProfile,
    isLoading,
    isError,
    error,
  } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: fetchUserDetails,
    enabled: !!userId,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...usersProfile });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedProfile({ ...usersProfile });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  // const handleSave = () => {
  //   setProfile({ ...editedProfile });
  //   setIsEditing(false);
  // };

  console.log(JSON.stringify(usersProfile?.email, null, 2));

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: 'url("/profile-background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay effect
      }}
    >
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md p-6 shadow-xl rounded-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-medium mb-6 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Profile Details
        </h2>

        {!isEditing ? (
          <div className="p-6">
            {/* Display Profile Details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-600">Name</h3>
              <p className="text-gray-700">{usersProfile?.name}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-600">Email</h3>
              <p className="text-gray-700">{usersProfile?.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-600">Details</h3>
              <p className="text-gray-700">
                {usersProfile?.profile_details
                  ? usersProfile?.profile_details
                  : "User Details...."}
              </p>
            </div>
            <button
              onClick={handleEditToggle}
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="p-6">
            {/* Editable Profile Form */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-blue-600 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-blue-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-blue-600 mb-2">
                Profile Details
              </label>
              <input
                type="text"
                name="profile_details"
                value={
                  editedProfile.profile_details ?? "User Profile Details..."
                }
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-between gap-4">
              <button
                // onClick={handleSave}
                className="w-full py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={handleEditToggle}
                className="w-full py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
