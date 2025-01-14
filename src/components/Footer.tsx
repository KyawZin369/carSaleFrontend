import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} Used Car Sales. All rights reserved.</p>
        <div className="space-x-4">
          <a href="/terms" className="hover:text-yellow-300 transition duration-300">Terms of Service</a>
          <a href="/privacy" className="hover:text-yellow-300 transition duration-300">Privacy Policy</a>
          <a href="/contact" className="hover:text-yellow-300 transition duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
