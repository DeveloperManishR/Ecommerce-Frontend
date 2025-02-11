import React, { useEffect, useState } from "react";
import { authAxios } from "../../config/config";
import { dateFormat, handleImage } from "../../utils/helper";
import ReviewModel from "../../Common/ReviewModel";
import { useSelector } from "react-redux";

const Orders = () => {
  const userId = useSelector((state) => state.auth.user.id);
  const [allOrders, setAllOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState("all");
  const [allModel, setAllModel] = useState({
    show: false,
    rating: 0,
    comment: "",
    product: "",
    orderItemid: "",
  });

  const getAllOrders = async (status) => {
    setCurrentTab(status);
    try {
      const response = await authAxios().get(`/order/users-get-all-orders`);
      setAllOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterOrders = async (status) => {
    setCurrentTab(status);
    try {
      const response = await authAxios().post(`/order/filter-product`, {
        orderStatus: status,
      });
      setAllOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <section className="py-20 bg-gray-50 font-[Inter]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Order History
        </h2>

        {/* Order Tabs */}
        <div className="flex justify-center mb-6">
          <ul className="flex space-x-8 text-lg font-medium">
            {["all", "dispatch", "completed"].map((tab) => (
              <li
                key={tab}
                onClick={() =>
                  tab === "all" ? getAllOrders(tab) : filterOrders(tab)
                }
                className={`cursor-pointer pb-2 border-b-4 transition-all duration-300 ${
                  currentTab === tab
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-600 hover:text-indigo-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* Order List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {allOrders.length > 0 ? (
            allOrders.map((order) => (
              <div key={order._id} className="mb-8 border-b pb-6">
                {/* Order Header */}
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Order:</span> {order._id}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Date: {dateFormat(order.createdAt)}
                    </p>
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                    Download Invoice
                  </button>
                </div>

                {/* Order Items */}
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center gap-6 p-4 border rounded-lg mt-4 bg-gray-50 shadow-sm"
                  >
                    {/* Product Image */}
                    <img
                      src={handleImage(item.product.images[0])}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.product.title}</h3>
                      <p className="text-gray-500">{item.product.category}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-gray-600">Qty: {item.quantity}</span>
                        <p className="font-bold text-lg">${item.price}</p>
                      </div>
                    </div>

                    {/* Order Status & Review */}
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-500">Order Status</p>
                      <p
                        className={`font-semibold text-lg ${
                          item.orderStatus === "pending"
                            ? "text-yellow-500"
                            : "text-green-600"
                        }`}
                      >
                        {item.orderStatus}
                      </p>

                      {item.orderStatus === "completed" && (
                        <button
                          onClick={() =>
                            setAllModel({
                              show: true,
                              product: item.product._id,
                              orderItemid: item._id,
                              rating: item.reviewid ? item.reviewid.rating : 0,
                            })
                          }
                          className="mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        >
                          {item.reviewid ? "View Review" : "Add Review"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 font-semibold">
              No orders found.
            </p>
          )}
        </div>

        {/* Review Modal */}
        {allModel.show && (
          <ReviewModel
            allmodel={allModel}
            setallmodel={setAllModel}
            handleSubmitReview={() => {}}
          />
        )}
      </div>
    </section>
  );
};

export default Orders;
