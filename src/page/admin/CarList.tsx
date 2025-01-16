import React, { useState, ChangeEvent } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { BaseApi } from "../../api/BaseApi";

type Car = {
  id: number;
  make: string;
  model: string;
  registration_year: number;
  price: number;
  picture_url: string;
};

type deleteCar = {
  id: number;
}


const Cars: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState<Partial<Car>>({
    make: "",
    model: "",
    registration_year: 0,
    price: 0,
    picture_url: "",
  });

  const queryClient = useQueryClient();

  const { data: cars, isLoading } = useQuery<Car[], Error>({
    queryKey: ["cars"],
    queryFn: async () => {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${BaseApi}/admin/car`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await response.json();
      return data.cars;
    },
  });

  // Add car mutation
  const addCarMutation = useMutation<Car, Error, Omit<Car, "id">>({
    mutationFn: async (car) => {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${BaseApi}/admin/car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(car),
      });
      if (!response.ok) {
        throw new Error("Failed to add car");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setShowModal(false);
      setNewCar({ make: "", model: "", registration_year: 0, price: 0, picture_url: "" });
    },
  });
  
  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: name === "price" || name === "registration_year" ? +value : value,
    }));
  };

// Delete car mutation
const deleteCarMutation = useMutation<void, Error, deleteCar>({
  mutationFn: async ({ id }) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${BaseApi}/admin/car/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete car");
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["cars"] });
  },
});

  // Handle adding car
  const handleAddCar = () => {
    if (newCar.make && newCar.model && newCar.registration_year && newCar.price && newCar.picture_url) {
      addCarMutation.mutate({
        make: newCar.make,
        model: newCar.model,
        registration_year: newCar.registration_year,
        price: Number(newCar.price),
        picture_url: newCar.picture_url,
      });
    }
  };

  const handleDeleteCar = (id: number) => {
    deleteCarMutation.mutate({id});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cars</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Car
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add New Car</h3>
            <div className="mb-4">
              <input
                type="text"
                name="make"
                value={newCar.make || ""}
                onChange={handleInputChange}
                placeholder="Make"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                name="model"
                value={newCar.model || ""}
                onChange={handleInputChange}
                placeholder="Model"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="number"
                name="registration_year"
                value={newCar.registration_year || ""}
                onChange={handleInputChange}
                placeholder="Registration Year"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="number"
                name="price"
                value={newCar.price || ""}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="url"
                name="picture_url"
                value={newCar.picture_url || ""}
                onChange={handleInputChange}
                placeholder="Picture URL"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCar}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={addCarMutation.isPending}
              >
                {addCarMutation.isPending ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cars Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Loading cars...</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border border-gray-300">Make</th>
                <th className="p-4 border border-gray-300">Model</th>
                <th className="p-4 border border-gray-300">Registration Year</th>
                <th className="p-4 border border-gray-300">Price</th>
                <th className="p-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars && cars.length > 0 ? (
                cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300">{car.make}</td>
                    <td className="p-4 border border-gray-300">{car.model}</td>
                    <td className="p-4 border border-gray-300">{car.registration_year}</td>
                    <td className="p-4 border border-gray-300">{car.price}</td>
                    <td className="p-4 border border-gray-300">
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this car?"
                            )
                          ) {
                            handleDeleteCar(car.id);
                          }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No cars available. Click "Add Car" to add a new car.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Cars;
