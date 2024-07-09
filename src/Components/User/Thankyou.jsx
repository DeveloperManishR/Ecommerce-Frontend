// ThankYouPage.js

import React from "react";
import { Link } from "react-router-dom";

const Thankyou = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white max-w-lg rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed.
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Thankyou;
