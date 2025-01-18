import React, { useEffect, useState } from 'react';
import {BaseApi} from '../../api/BaseApi'
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

// Define the Transaction interface
interface User {
  id: number;
  name: string;
  email: string;
  profile_details: string | null;
  is_admin: number;
  created_at: string;
  updated_at: string;
}

interface Car {
  id: number;
  user_id: number;
  make: string;
  model: string;
  registration_year: string;
  price: string;
  picture_url: string;
  created_at: string;
  updated_at: string;
}

interface Bid {
  id: number;
  car_id: number;
  user_id: number;
  bid_price: string;
  created_at: string;
  updated_at: string;
}

interface Transaction {
  id: number;
  user_id: number;
  car_id: number;
  bid_id: number;
  transaction_date: string;
  payment_method: string;
  amount: string;
  created_at: string;
  updated_at: string;
  user: User;
  car: Car;
  bid: Bid;
}

async function fetchTransaction() {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`${BaseApi}/admin/transaction`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return data.transactions;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions on component mount

  const {data , isLoading, error} = useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: fetchTransaction,
  })

  useEffect(()=>{
    if(data){
      setTransactions(data);
    }
  }, [data]);

  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter transactions based on search term
  const filteredTransactions = Array.isArray(data) ? data.filter(
    (transaction) =>
      transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.car.model.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

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
              <th className="p-4 border border-gray-300">Make</th>
              <th className="p-4 border border-gray-300">Car Model</th>
              <th className="p-4 border border-gray-300">Transaction Date</th>
              <th className="p-4 border border-gray-300">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-300">{transaction.user.name}</td>
                  <td className="p-4 border border-gray-300">{transaction.car.make}</td>
                  <td className="p-4 border border-gray-300">{transaction.car.model}</td>
                  <td className="p-4 border border-gray-300">{dayjs(transaction.transaction_date).format("DD/MM/YYYY")}</td>
                  <td className="p-4 border border-gray-300">{transaction.payment_method}</td>
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
