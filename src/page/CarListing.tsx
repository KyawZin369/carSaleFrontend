import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import { BaseApi } from "../api/BaseApi";
import Footer from "../components/Footer";

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
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Fetch error details:", error);
    throw new Error(error?.message || "Failed to fetch car data");
  }

  const data = await response.json();

  if (!Array.isArray(data.cars)) {
    throw new Error("Unexpected response format: Expected an array in 'cars'");
  }

  return data.cars;
};

const buyCar = async (
  carId: number,
  carPrice: number,
  user_id
): Promise<any> => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${BaseApi}/user/bit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      car_id: carId,
      bid_price: carPrice,
      user_id: user_id,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Buy car error details:", error);
    throw new Error(error?.message || "Failed to buy the car");
  }

  return response.json();
};

const CarListing = () => {
  const {
    data: cars,
    isLoading,
    isError,
    error,
  } = useQuery<Car[]>({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: buyCarMutate, isPending: isBuying } = useMutation<
    any,
    Error,
    { carId: number; carPrice: number; user_id: number }
  >({
    mutationKey: ["buy-car"],
    mutationFn: ({ carId, carPrice, user_id }) =>
      buyCar(carId, carPrice, user_id),
    onSuccess: (data) => {
      console.log("Car purchase successful:", data);
      alert("Car purchased successfully!");
      setModalOpen(false);
    },
    onError: (err) => {
      console.error("Error buying car:", err);
      alert("Failed to purchase the car. Please try again.");
    },
  });

  const handleBuyClick = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

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

  const userToken = sessionStorage.getItem("token");
  const userId = JSON.parse(sessionStorage.getItem("user") || "null");

  const confirmPurchase = () => {
    if (selectedCar) {
      buyCarMutate({
        carId: selectedCar.id,
        carPrice: selectedCar.price,
        user_id: userId,
      });
    }
  };

  return (
    <div>
      <Navigation token={userToken} userId={userId} />
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
                    <button
                      onClick={() => handleBuyClick(car)}
                      className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 disabled:opacity-50"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center mt-48">
            <Link to="/car-add" className="text-blue-500 hover:underline">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
                Add Car To Sell
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal */}
      {isModalOpen && selectedCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
            <p className="mb-4">
              Are you sure you want to buy the{" "}
              <strong>{`${selectedCar.make} ${selectedCar.model}`}</strong> for{" "}
              <strong>${selectedCar.price.toLocaleString()}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                disabled={isBuying}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isBuying ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarListing;
