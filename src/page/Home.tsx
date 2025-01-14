import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200"
      style={{
        backgroundImage: "url(/carImage2.jpg)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navigation />
      <main className="flex-grow p-6 bg-opacity-80 bg-black">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white mb-6 animate-fadeIn">
            Welcome to the Used Car Sales Portal
          </h1>
          <p className="text-lg text-gray-100 max-w-3xl mx-auto mb-8">
            Your ultimate platform to buy and sell quality used cars. Explore
            trusted listings, connect with verified sellers, and enjoy a
            seamless browsing experience.
          </p>
          <div className="flex justify-center space-x-6 mt-8">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg shadow-lg bg-white transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-semibold mb-4">Wide Selection</h2>
              <p>
                Browse a variety of cars from multiple brands and categories to
                suit your needs.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-lg bg-white transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-semibold mb-4">Trusted Sellers</h2>
              <p>
                Connect with verified sellers for a secure and trustworthy
                transaction experience.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-lg bg-white transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-semibold mb-4">Easy Search</h2>
              <p>
                Use our intuitive search tools to quickly find the perfect car
                for you.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
