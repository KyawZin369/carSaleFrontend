import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ContactUs = () => {
  return (
   <div>
    <Navigation/>
     <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: 'url("/carImage2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light overlay effect
      }}
    >
      <div className="max-w-4xl bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-xl my-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-6 text-center leading-relaxed">
          Have questions or need assistance? Feel free to get in touch with our friendly team. We’re here to help!
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-blue-600 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-blue-600 mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-blue-600 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              rows={5}
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-700 text-sm">
            Or email us directly at{' '}
            <a href="mailto:support@usedcarsalesportal.com" className="text-blue-600 hover:underline">
              support@usedcarsalesportal.com
            </a>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
   </div>
  );
};

export default ContactUs;
