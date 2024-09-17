import React, { useEffect, useState } from "react";
import { authAxios, withoutAuthAxios } from "../../config/config";
import {
  Bars3Icon,
  BellIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProductModel from "./Model/ProductModel";
import { toast } from "react-toastify";
import ProductDetail from "../../Common/ProductDetail";
import { handleViewPrice, handleViewRating } from "../../utils/helper";
const Products = () => {
  const [products, setproducts] = useState([]);

  const [model, setmodel] = useState({
    show: false,
    data: [],
  });

  const [allmodel, setallmodel] = useState({
    data: {},
    showProductDetail: false,
  });

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

  const handleAddProduct = async (data) => {
    const formData = new FormData();
    data?.images?.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    await authAxios()
      .post(`/product/create-product`, formData)
      .then((response) => {
        const resData = response.data;
        toast.success(resData.message);
        fetchAllproducts();
        setmodel((prev) => ({
          ...prev,
          show: false,
        }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleEditProduct = async (data) => {

    console.log("data",data)
    const formData = new FormData();
    

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    await authAxios()
      .put(`/product/update-product/${model?.data?._id}`, formData)
      .then((response) => {
        const resData = response.data;
        toast.success(resData.message);
        fetchAllproducts();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteProduct = async (id) => {
    await authAxios()
      .delete(`/product/delete-product/${id}`)
      .then((response) => {
        const resData = response.data;
        toast.success(resData.message);
        fetchAllproducts();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const [currentDropdown, setcurrentDropdown] = useState([]);

  console.log("curr", currentDropdown);

  useEffect(() => {
    fetchAllproducts();
    //  fetchAllproductsCategory();
  }, []);
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="flex gap-[5px] gap-y-[10px] flex-wrap w-full justify-end">
        <button className="flex items-center max-w-[140px] border border-white w-full justify-center bg-white text-textcolor py-[8px] px-[10px] h-[39px] rounded-[5px] duration-[0.3s] hover:bg-transparent hover:border-textcolor hover:text-textcolor h-[45px] font-[600] min-h">
          Total Products: {products?.length}
        </button>

        <button
          onClick={() => setmodel((prev) => ({ ...prev, show: true }))}
          className=" bg-black flex items-center max-w-[160px] border border-buttonbg w-full justify-center bg-buttonbg text-white py-[8px] px-[15px] h-[39px] rounded-[5px] duration-[0.3s]  h-[45px] font-[600] min-h"
        >
          Add Product
        </button>
      </div>

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
                  <td className="px-6 py-4 whitespace-nowrap">{handleViewPrice(item?.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {handleViewRating(item?.rating)}
                  </td>
                  <td
                    onClick={() => setcurrentDropdown(item)}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    <Menu as="div" className="relative inline-block text-left">
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
                          <MenuItem
                            onClick={() =>
                              setallmodel((prev) => ({
                                ...prev,
                                showProductDetail: true,
                                data: item,
                              }))
                            }
                          >
                            <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                              View
                            </li>
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              setmodel((prev) => ({
                                ...prev,
                                show: true,
                                data: item,
                              }))
                            }
                          >
                            <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                              Edit
                            </li>
                          </MenuItem>
                          <MenuItem>
                            <li
                              onClick={() => handleDeleteProduct(item._id)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Delete
                            </li>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {model.show && (
        <ProductModel
          setmodel={setmodel}
          model={model}
          handleAddProduct={handleAddProduct}
          handleEditProduct={handleEditProduct}
        />
      )}

      {allmodel.showProductDetail && (
        <ProductDetail allmodel={allmodel} setallmodel={setallmodel} />
      )}
    </div>
  );
};

export default Products;
