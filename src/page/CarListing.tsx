// src/pages/CarListing.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import { BaseApi } from "../api/BaseApi";

type Car = {
  id: number;
  make: string;
  model: string;
  price: number;
  image: string;
  registration_year: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile_details: string;
    is_admin: number;
  };
};


// Fetch function
const fetchCars = async (): Promise<Car[]> => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${BaseApi}/user/car`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Fetch error details:", error);
    throw new Error(error.message || "Failed to fetch car data");
  }

  const data = await response.json();
  console.log("API raw response:", data);

  if (!Array.isArray(data.cars)) {
    throw new Error("Unexpected response format: Expected an array in 'cars'");
  }

  return data.cars;
};


const CarListing = () => {
  const { data: cars, isLoading, isError, error } = useQuery<Car[]>({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <p className="text-xl font-semibold text-red-500">
          Error: {error.message}
        </p>
      </div>
    );
  }

  const userToken = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('user');

  return (
    <div>
      <Navigation token={userToken} userId={userId}/>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/banner.jpg)" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 py-10">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Car Listings
          </h1>
          <div className="container mx-auto px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
            {cars?.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2">{`${car.make} ${car.model}`}</h2>
                  <p className="text-lg text-gray-600 mb-4">
                    Price: ${car.price.toLocaleString()}
                  </p>
                  <div className="flex justify-between">
                    <Link
                      to={`/car-detail/${car.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                    <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
