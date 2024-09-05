import React, { useEffect, useState } from "react";
import { withoutAuthAxios } from "../../config/config";
import {
  Bars3Icon,
  BellIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
const Products = () => {
  const [products, setproducts] = useState([]);

  const fetchAllproducts = async () => {
    await withoutAuthAxios()
      .get(`/product/get-all-products`)
      .then((response) => {
        const resData = response.data;

        setproducts(resData.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  console.log(products);

  useEffect(() => {
    fetchAllproducts();
    //  fetchAllproductsCategory();
  }, []);
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sno
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products &&
              products.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item?.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item?.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
