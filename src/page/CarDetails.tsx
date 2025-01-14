// src/pages/CarDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const cars = [
    { id: 1, make: 'Tesla', model: 'Model S', price: 79999, description: 'A luxury electric sedan.', image: '/tesla-model-s.jpg' },
    { id: 2, make: 'BMW', model: 'X5', price: 58999, description: 'A premium SUV with great performance.', image: '/bmw-x5.jpg' },
    { id: 3, make: 'Audi', model: 'A6', price: 49999, description: 'A stylish and powerful sedan.', image: '/audi-a6.jpg' },
  ];

  const car = cars.find((car) => car.id === parseInt(id));

  if (!car) {
    return <div className="text-center text-white mt-10">Car not found!</div>;
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/banner.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 py-10">
        <div className="container mx-auto px-4 max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-64 object-cover rounded mb-4" />
          <h1 className="text-3xl font-bold mb-4">{`${car.make} ${car.model}`}</h1>
          <p className="text-lg text-gray-700 mb-4">{car.description}</p>
          <p className="text-lg text-gray-600 mb-4">Price: ${car.price.toLocaleString()}</p>
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
