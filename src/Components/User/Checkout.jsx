import React, { useState } from 'react';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const steps = [
    { number: 1, title: 'Shipping' },
    { number: 2, title: 'Products' },
    { number: 3, title: 'Payment' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 font-['Inter']">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-500">Complete your purchase securely</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  currentStep === step.number 
                    ? 'border-indigo-600 bg-indigo-600 text-white' 
                    : currentStep > step.number
                    ? 'border-indigo-600 bg-white text-indigo-600'
                    : 'border-gray-200 bg-white text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                <p className={`mt-3 text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}>{step.title}</p>
                {index < steps.length - 1 && (
                  <div className={`absolute top-6 left-full w-full h-0.5 transition-all duration-200 ${
                    currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} style={{ width: '150%', left: '60%' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Step 1: Shipping */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Shipping Details</h2>
                <p className="text-gray-500 mt-1">Please enter your shipping information</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                  placeholder="123 Street Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal code</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Products */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Review Your Order</h2>
                <p className="text-gray-500 mt-1">Please verify your items</p>
              </div>

              <div className="space-y-6">
                {/* Product Card */}
                <div className="flex items-start space-x-6 p-6 bg-gray-50 rounded-xl">
                  <img 
                    src="/api/placeholder/120/120" 
                    alt="Product"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Basic Tee</h3>
                        <p className="text-gray-500 mt-1">Black • Large</p>
                      </div>
                      <p className="text-lg font-medium text-gray-900">$32.00</p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <button className="ml-4 text-sm text-indigo-600 hover:text-indigo-700">Remove</button>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">$64.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">$5.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium text-gray-900">$5.52</span>
                  </div>
                  <div className="pt-4 flex justify-between border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">$75.52</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Payment Details</h2>
                <p className="text-gray-500 mt-1">Complete your purchase securely</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry date</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                      placeholder="MM / YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name on card</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
              currentStep === 1
                ? 'opacity-0 cursor-default'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={currentStep === totalSteps ? () => alert('Order placed!') : nextStep}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            {currentStep === totalSteps ? 'Place Order' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;