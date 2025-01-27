import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BaseApi } from "../api/BaseApi"

// Define the Car type
interface Car {
  make: string;
  model: string;
  registration_year: number;
  price: number;
  picture_url: string;
}

const AddCar: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State for the form inputs
  const [formData, setFormData] = useState<Car>({
    make: "",
    model: "",
    registration_year: 0,
    price: 0,
    picture_url: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Query Mutation
  const addCarMutation = useMutation<Car, Error, Car>({
    mutationFn: async (car) => {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${BaseApi}/user/car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(car),
      });
      if (!response.ok) {
        throw new Error("Failed to add car");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
      setFormData({
        make: "",
        model: "",
        registration_year: 0,
        price: 0,
        picture_url: "",
      });
      navigate("/car-list");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "registration_year" ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addCarMutation.mutate(formData); // Trigger mutation
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="relative min-h-screen bg-gray-400 py-10">
        <div className="container mx-auto px-4 max-w-3xl bg-white rounded-lg shadow-lg p-6">
          <div className="my-5 w-36">
            <Link
              to="/car-list"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 p-2"
              aria-label="Go back to car list"
            >
              <IoMdArrowRoundBack />
              <span className="hidden md:inline">Back</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="make"
              >
                Make
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="model"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="registration_year"
              >
                Registration Year
              </label>
              <input
                type="number"
                id="registration_year"
                name="registration_year"
                value={formData.registration_year}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="picture_url"
              >
                Picture URL
              </label>
              <input
                type="text"
                placeholder="Add Your Car Image Link"
                id="picture_url"
                name="picture_url"
                value={formData.picture_url}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              {formData.picture_url && (
                <img
                  src={formData.picture_url}
                  alt="Preview"
                  className="mt-4 w-64 h-40 object-cover rounded"
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting || addCarMutation.isPending}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting || addCarMutation.isPending
                  ? "Submitting..."
                  : "Add Car"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/car-list")}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCar;
