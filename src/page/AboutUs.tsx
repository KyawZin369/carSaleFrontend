import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
        <Navigation/>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{
          backgroundImage: 'url("/carImage2.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay effect
        }}
      >
        <div className="max-w-5xl bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
            About Us
          </h1>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Welcome to the{" "}
            <span className="font-bold text-blue-600">
              Used Car Sales Portal
            </span>
            , your trusted partner in buying and selling cars. We are committed
            to providing a seamless experience for our customers by offering
            reliable, secure, and user-friendly services.
          </p>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Our platform ensures transparency in every transaction, connecting
            buyers with verified sellers and helping them find the best deals.
            Whether you're looking for a reliable family car or a luxury
            vehicle, we make the process effortless.
          </p>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            At the heart of our operations is a customer-first approach, driven
            by innovation and a passion for excellence. We leverage advanced
            technologies to enhance your car-buying experience, ensuring trust
            and quality in every step.
          </p>
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-blue-700">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed mt-2">
              To redefine the car sales experience by offering a secure,
              transparent, and efficient platform that caters to every
              customer’s needs.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
