import React, { useState } from "react";

const FinalCheckout = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);

  const addresses = [
    {
      id: 0,
      name: "Manish",
      label: "HOME",
      phone: "9910920899",
      address:
        "Ca 48c, DDA Janta Flats Block CA, DDA LIG Flats, Hari Nagar, New Delhi, Delhi - 110064",
    },
    {
      id: 1,
      name: "Manish Rawat",
      label: "WORK",
      phone: "9910920899",
      address:
        "C-71 sector 2 second floor, Burger king road, Noida, Uttar Pradesh - 201301",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <div className="max-w-7xl w-full flex">
        {/* Left Side - Main Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mr-4">
          <h1 className="text-xl font-semibold mb-4">Checkout</h1>

         
          <div className="border-b border-gray-300 pb-4 mb-4">
            <h2 className="text-lg font-medium">1. DELIVERY ADDRESS</h2>
            <div className="mt-4 space-y-4">
              {/* Address 1 */}
              <div className="flex items-start space-x-2">
                <input type="radio" name="address" />
                <div>
                  <p className="font-semibold">Manish (HOME)</p>
                  <p>Ca 48c, DDA Janta Flats, New Delhi, Delhi - 110064</p>
                </div>
              </div>
              {/* Address 2 */}
              <div className="flex items-start space-x-2">
                <input type="radio" name="address" defaultChecked />
                <div>
                  <p className="font-semibold">Manish Rawat (WORK)</p>
                  <p>C-71 sector 2, Burger king road, Noida, Uttar Pradesh - 201301</p>
                  <button className="text-blue-500">Edit</button>
                </div>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded mt-4">Deliver Here</button>
            <button className="text-blue-500 mt-4 block">+ Add a new address</button>
          </div>

          {/* Order Summary Section */}
          <div className="border-b border-gray-300 pb-4 mb-4">
            <h2 className="text-lg font-medium">3. ORDER SUMMARY</h2>
          </div>

          {/* Payment Options Section */}
          <div>
            <h2 className="text-lg font-medium">4. PAYMENT OPTIONS</h2>
          </div>
        </div>

        {/* Right Side - Price Details */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium mb-4">PRICE DETAILS</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price (1 item)</span>
              <span>₹1,298</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600 line-through">₹140</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹3</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total Payable</span>
              <span>₹1,301</span>
            </div>
            <div className="text-green-600 font-medium mt-2">
              Your Total Savings on this order ₹697
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCheckout;
