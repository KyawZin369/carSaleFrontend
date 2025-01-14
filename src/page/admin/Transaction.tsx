import React, { useState } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    {
      buyerName: 'John Doe',
      carName: 'Toyota Camry',
      carModel: '2021',
      transactionDate: '2025-01-01',
      paymentMethod: 'Credit Card',
    },
    {
      buyerName: 'Jane Smith',
      carName: 'Honda Accord',
      carModel: '2022',
      transactionDate: '2025-01-05',
      paymentMethod: 'PayPal',
    },
    {
      buyerName: 'Alex Johnson',
      carName: 'Tesla Model 3',
      carModel: '2023',
      transactionDate: '2025-01-10',
      paymentMethod: 'Bank Transfer',
    },
  ]); // Mock transaction data

  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.carModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by buyer, car name, or model..."
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Transaction Listings Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border border-gray-300">Buyer Name</th>
              <th className="p-4 border border-gray-300">Car Name</th>
              <th className="p-4 border border-gray-300">Car Model</th>
              <th className="p-4 border border-gray-300">Transaction Date</th>
              <th className="p-4 border border-gray-300">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-300">{transaction.buyerName}</td>
                  <td className="p-4 border border-gray-300">{transaction.carName}</td>
                  <td className="p-4 border border-gray-300">{transaction.carModel}</td>
                  <td className="p-4 border border-gray-300">{transaction.transactionDate}</td>
                  <td className="p-4 border border-gray-300">{transaction.paymentMethod}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
