import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BaseApi } from '../api/BaseApi';

// Define the Car type
interface Car {
  id: number;
  make: string;
  model: string;
  price: number;
  description: string;
  image: string;
}

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

const fetchCarDetails = async (): Promise<Car> => {
    if (!id) {
      throw new Error("User ID is not defined.");
    }

    const response = await fetch(`${BaseApi}/user/car/${id}`, {
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

    return data.car as Car;
  };

    const {
      data: carDetails,
      isLoading,
      isError,
      error,
    } = useQuery<Car>({
      queryKey: ["car", id],
      queryFn: fetchCarDetails,
      enabled: !!id,
    });

  console.log(JSON.stringify(carDetails, null, 2));

  if (isLoading) {
    return <div className="text-center text-white mt-10">Loading car details...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 mt-10">Error: {error.message}</div>;
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/banner.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 py-10">
        <div className="container mx-auto px-4 max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <img src={carDetails?.image} alt={`${carDetails?.make} ${carDetails?.model}`} className="w-full h-64 object-cover rounded mb-4" />
          <h1 className="text-3xl font-bold mb-4">{`${carDetails?.make} ${carDetails?.model}`}</h1>
          <p className="text-lg text-gray-700 mb-4">{carDetails?.description}</p>
          <p className="text-lg text-gray-600 mb-4">Price: ${carDetails?.price.toLocaleString()}</p>
          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
            >
              Back
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
