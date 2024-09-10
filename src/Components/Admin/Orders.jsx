import React, { useEffect, useState } from "react";
import { authAxios } from "../../config/config";
import { dateFormat } from "../../utils/helper";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { toast } from "react-toastify";

const AOrders = () => {
  const [allOrders, setallOrders] = useState([]);

  const [selectedData, setselectedData] = useState([]);

  const getAllOrder = async () => {
    await authAxios()
      .get(`/order/get-all-orders`)
      .then((response) => {
        const resData = response.data;
        setallOrders(resData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateOrder = async (data, id) => {
    await authAxios()
      .put(`/order/update-order`, { status: data, orderId: id })
      .then((response) => {
        toast.success(response.data.message);
        getAllOrder();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllOrder();
  }, []);

  console.log("all", allOrders);
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Channel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allOrders &&
              allOrders.map((item, index) => (
                <>
                  {item.orderItems.map((order, newIndex) => (
                    <>
                      <tr key={item?.id} >
                        <td className="px-6 py-4 whitespace-nowrap"></td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.userid.fname} {item?.userid.lname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {dateFormat(item?.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.paymentStatus}
                        </td>
                        <td
                          className={`  px-6 py-24  whitespace-nowrap ${
                            order.orderStatus === "pending"
                              ? "text-brown-300"
                              : order.orderStatus === "dispatch"
                              ? "text-blue-300"
                              : order.orderStatus === "completed"
                              ? "text-green-300"
                              : ""
                          }`}
                        >
                          {order?.orderStatus}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <MenuButton className="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                  />
                                </svg>
                              </MenuButton>
                            </div>

                            <MenuItems
                              transition
                              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              <div className="py-1">
                                <MenuItem>
                                  <li
                                    onClick={() =>
                                      handleUpdateOrder("dispatch", order._id)
                                    }
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                  >
                                    Dispatch
                                  </li>
                                </MenuItem>
                                <MenuItem>
                                  <li
                                    onClick={() =>
                                      handleUpdateOrder("completed", order._id)
                                    }
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                  >
                                    Completed
                                  </li>
                                </MenuItem>
                                {/* <MenuItem>
                                  <li
                                  
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                  >
                                    Delete
                                  </li>
                                </MenuItem> */}
                              </div>
                            </MenuItems>
                          </Menu>
                        </td>
                      </tr>
                    </>
                  ))}
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AOrders;
