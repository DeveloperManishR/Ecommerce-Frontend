import React from "react";

const Orders = () => {
  const orders = [
    {
      orderNumber: "WU88191111",
      datePlaced: "Jul 6, 2021",
      totalAmount: "$160.00",
      items: [
        {
          name: "Micro Backpack",
          description:
            "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
          price: "$70.00",
          deliveryDate: "Delivered on July 12, 2021",
        },
        {
          name: "Nomad Shopping Tote",
          description:
            "This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.",
          price: "$90.00",
          deliveryDate: "Delivered on July 12, 2021",
        },
      ],
    },
    {
      orderNumber: "AT48441546",
      datePlaced: "Dec 22, 2020",
      totalAmount: "$40.00",
      items: [
        {
          name: "Double Stack Clothing Bag",
          description:
            "Save space and protect your favorite clothes in this double-layer garment bag. Each compartment easily holds multiple pairs of jeans or tops, while keeping your items neatly folded throughout your trip.",
          price: "$40.00",
          deliveryDate: "Delivered on January 5, 2021",
        },
      ],
    },
  ];

  return (
    <div className="bg-white py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Order history</h2>
        <p className="text-gray-600 mb-8">
          Check the status of recent orders, manage returns, and discover
          similar products.
        </p>

        {orders.map((order, index) => (
          <div key={index} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-700">Order number</p>
                <p className="font-medium">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-700">Date placed</p>
                <p className="font-medium">{order.datePlaced}</p>
              </div>
              <div>
                <p className="text-gray-700">Total amount</p>
                <p className="font-medium">{order.totalAmount}</p>
              </div>
              <div className="space-x-2">
                <button className="px-4 py-2 text-white bg-gray-800 rounded">
                  View Order
                </button>
                <button className="px-4 py-2 text-white bg-gray-800 rounded">
                  View Invoice
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gray-200 rounded mr-4"></div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-700 font-medium mt-2">
                      {item.price}
                    </p>
                    <p className="text-green-500 font-medium mt-1">
                      {item.deliveryDate}
                    </p>
                    <div className="space-x-4 mt-4">
                      <a href="#" className="text-indigo-600">
                        View product
                      </a>
                      <a href="#" className="text-indigo-600">
                        Buy again
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
