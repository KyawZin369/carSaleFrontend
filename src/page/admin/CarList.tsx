import React, { useState } from 'react';

const Cars = () => {
  const [cars, setCars] = useState([]); // State for car listings
  const [showModal, setShowModal] = useState(false); // State to toggle the modal
  const [newCar, setNewCar] = useState({ owner: '', make: '', model: '', price: '' }); // State for new car input

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  // Add a new car to the list
  const addCar = () => {
    if (newCar.owner && newCar.make && newCar.model && newCar.price) {
      setCars([...cars, newCar]);
      setNewCar({ owner: '', make: '', model: '', price: '' });
      setShowModal(false);
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cars</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Car
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add New Car</h3>
            <div className="mb-4">
              <input
                type="text"
                name="owner"
                value={newCar.owner}
                onChange={handleInputChange}
                placeholder="Owner Name"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                name="make"
                value={newCar.make}
                onChange={handleInputChange}
                placeholder="Make"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                name="model"
                value={newCar.model}
                onChange={handleInputChange}
                placeholder="Model"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="number"
                name="price"
                value={newCar.price}
                onChange={handleInputChange}
                placeholder="Price"
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
                onClick={addCar}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Car Listings Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border border-gray-300">Owner</th>
              <th className="p-4 border border-gray-300">Make</th>
              <th className="p-4 border border-gray-300">Model</th>
              <th className="p-4 border border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-300">{car.owner}</td>
                  <td className="p-4 border border-gray-300">{car.make}</td>
                  <td className="p-4 border border-gray-300">{car.model}</td>
                  <td className="p-4 border border-gray-300">{car.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No cars available. Click "Add Car" to add a new car.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cars;
