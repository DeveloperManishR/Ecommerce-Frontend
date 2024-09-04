import React, { useEffect, useState } from "react";
import { withoutAuthAxios } from "../../config/config";
import {
  Bars3Icon,
  BellIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
const Home = () => {
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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="sticky inset-y-0 start-0 bg-white px-4 py-2">
              <label htmlFor="SelectAll" className="sr-only">
                Select All
              </label>

              <input
                type="checkbox"
                id="SelectAll"
                className="size-5 rounded border-gray-300"
              />
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Date of Birth
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Category
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Rating
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <>
                <tr>
                  <td className="sticky inset-y-0 start-0 bg-white px-4 py-2">
                    <label className="sr-only" htmlFor="Row1">
                      Row 1
                    </label>

                    <input
                      className="size-5 rounded border-gray-300"
                      type="checkbox"
                      id="Row1"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.rating}⭐
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 ">
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
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
