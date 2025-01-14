import React, { useState } from 'react';

const Bids = () => {
  const [bids, setBids] = useState([
    {
      carName: 'Toyota Camry',
      price: '$20,000',
    },
    {
      carName: 'Honda Accord',
      price: '$22,000',
    },
    {
      carName: 'Tesla Model 3',
      price: '$40,000',
    },
  ]); // Mock bid data

  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter bids based on search term
  const filteredBids = bids.filter((bid) =>
    bid.carName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bids</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by car name..."
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Bid Listings Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border border-gray-300">Car Name</th>
              <th className="p-4 border border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredBids.length > 0 ? (
              filteredBids.map((bid, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-300">{bid.carName}</td>
                  <td className="p-4 border border-gray-300">{bid.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center p-4">
                  No bids found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bids;
