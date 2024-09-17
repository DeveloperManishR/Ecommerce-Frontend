import React, { useEffect, useState } from "react";
import { authAxios } from "../../config/config";
import { dateFormat, handleImage } from "../../utils/helper";
import ReviewModel from "../../Common/ReviewModel";
import { useSelector } from "react-redux";

const Orders = () => {
  const userId = useSelector((state) => state.auth.user.id);

  const [allOrders, setallOrders] = useState([]);

  const [currentTab, setcurrentTab] = useState("all");

  const [allmodel, setallmodel] = useState({
    show: false,
    rating: 0,
    comment: "",
    product: "",
    orderItemid: "",
  });

  const getAllOrder = async (data) => {
    if (data) {
      setcurrentTab(data);
    }
    await authAxios()
      .get(`/order/users-get-all-orders`)
      .then((response) => {
        const resData = response.data;
        setallOrders(resData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterOrder = async (data) => {
    setcurrentTab(data);
    console.log("data", data);

    await authAxios()
      .post(`/order/filter-product`, { orderStatus: data })
      .then((response) => {
        const resData = response.data;
        setallOrders(resData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitReview = async () => {
    const payload = {
      rating: allmodel.rating,
      comment: allmodel.comment,
      product: allmodel.product,
      orderItemid: allmodel.orderItemid,
      userid: userId,
    };

    console.log(payload);
    await authAxios()
      .post(`/review/add-product-review`, payload)
      .then((response) => {
        setallmodel((prev) => ({
          ...prev,
          show: false,
          rating: 0,
          comment: "",
          product: "",
          orderItemid: "",
        }));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  console.log("all", allOrders);
  // /users-get-all-orders

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
          Order History
        </h2>
        <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
          <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
            <li
              onClick={() => getAllOrder("all")}
              className={`font-medium text-lg leading-8 cursor-pointer ${
                currentTab == "all" ? "text-indigo-600" : "text-black"
              }  transition-all duration-500 hover:text-indigo-600`}
            >
              All Order
            </li>
            <li
              onClick={() => filterOrder("pending")}
              className={`font-medium text-lg leading-8 cursor-pointer ${
                currentTab == "pending" ? "text-indigo-600" : "text-black"
              } transition-all duration-500 hover:text-indigo-600`}
            >
              Pending
            </li>
            <li
              onClick={() => filterOrder("dispatch")}
              className={`font-medium text-lg leading-8 cursor-pointer ${
                currentTab == "dispatch" ? "text-indigo-600" : "text-black"
              } transition-all duration-500 hover:text-indigo-600`}
            >
              Dispatched
            </li>
            <li
              onClick={() => filterOrder("completed")}
              className={`font-medium text-lg leading-8 cursor-pointer${
                currentTab == "completed" ? "text-indigo-600" : "text-black"
              } transition-all duration-500 hover:text-indigo-600`}
            >
              Completed
            </li>
          </ul>
        </div>
        <div className="mt-7 border border-gray-300 pt-9">
          {allOrders &&
            allOrders.length > 0 &&
            allOrders.map((item) => (
              <>
                <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                  <div className="data">
                    <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                      Order : {item?._id}
                    </p>
                    <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                      Order date : {dateFormat(item.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 max-md:mt-5">
                    <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                      Show Invoice
                    </button>
                    <button className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">
                      Buy Now
                    </button>
                  </div>
                </div>
                <svg
                  className="my-9 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  width={1216}
                  height={2}
                  viewBox="0 0 1216 2"
                  fill="none"
                >
                  <path d="M0 1H1216" stroke="#D1D5DB" />
                </svg>

                {item.orderItems.map((order) => (
                  <>
                    <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                      <div className="grid grid-cols-4 w-full">
                        <div className="col-span-4 sm:col-span-1">
                          <img
                            src={handleImage(order.product.images[0])}
                            alt=""
                            className="max-sm:mx-auto"
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                          <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                            {order.product.title}
                          </h6>
                          <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">
                            {order.product.category}
                          </p>
                          <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                            {/* <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                              Size: s
                            </span> */}
                            <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                              Qty: {order.quantity}
                            </span>
                            <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                              Price ${order.price}
                            </p>
                          </div>
                        </div>

                        {order.orderStatus == "completed" &&
                          order.reviewid == null && (
                            <button
                              onClick={() =>
                                setallmodel((prev) => ({
                                  ...prev,
                                  show: true,
                                  product: order.product._id,
                                  orderItemid: order._id,
                                }))
                              }
                              className="bg-black text-white"
                            >
                              {" "}
                              Add Review
                            </button>
                          )}

                        {order.orderStatus == "completed" && order.reviewid && (
                          <button
                            onClick={() =>
                              setallmodel((prev) => ({
                                ...prev,
                                show: true,
                                product: order.product._id,
                                orderItemid: order._id,
                                rating:order.reviewid.rating
                              }))
                            }
                            className="bg-black text-white"
                          >
                            View Review
                          </button>
                        )}
                       
                      </div>
                      <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                        <div className="flex flex-col justify-center items-start max-sm:items-center">
                          <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                            Order Status
                          </p>
                          <p
                            className={`font-bold text-lg leading-8 ${
                              order.orderStatus == "pending"
                                ? "text-yellow-400"
                                : "text-green-500"
                            }  text-left whitespace-nowrap`}
                          >
                            {order.orderStatus}
                          </p>
                        </div>
                        
                      </div>
                    </div>

                    <svg
                      className="my-9 w-full"
                      xmlns="http://www.w3.org/2000/svg"
                      width={1216}
                      height={2}
                      viewBox="0 0 1216 2"
                      fill="none"
                    >
                      <path d="M0 1H1216" stroke="#D1D5DB" />
                    </svg>
                  </>
                ))}
              </>
            ))}
        </div>

        {allmodel.show && (
          <ReviewModel
            allmodel={allmodel}
            setallmodel={setallmodel}
            handleSubmitReview={handleSubmitReview}
          />
        )}
      </div>
    </section>
  );
};

export default Orders;
