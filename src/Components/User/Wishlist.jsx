import React, { useEffect, useState } from "react";
import { authAxios } from "../../config/config";
import { RiShoppingBagLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { handleImage } from "../../../utils/helper";

const Wishlist = () => {
  const [wishlistProducts, setwishlistProducts] = useState([]);

  const getAllwishlistProducts = async () => {
    await authAxios()
      .get(`/wishlist/get-wishlist-products`)
      .then((response) => {
        const resData = response.data;
        setwishlistProducts(resData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeWishlistProduct = async (id) => {
    console.log("sdsd", id);

    await authAxios()
      .delete(`/wishlist/delete-wishlist-product/${id}`)
      .then((response) => {
        const resData = response.data;
        console.log(resData);
        //  toast.success(resData.message);
        getAllwishlistProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTocart = async (item) => {
    await authAxios()
      .post(`/cart/add-to-cart/${item.wishlist._id}`)
      .then((response) => {
        removeWishlistProduct(item._id);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    getAllwishlistProducts();
  }, []);

  console.log(wishlistProducts);

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Wishlist (4)</h2>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm">
            Move All To Bag
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border p-4 rounded shadow-sm relative">
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -35%
            </span>
            <img
              src="https://via.placeholder.com/200"
              alt="Gucci duffle bag"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Gucci duffle bag</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-500 font-semibold">$960</span>
              <span className="line-through text-gray-500">$1160</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded">
              Add To Cart
            </button>
          </div>
          <div className="border p-4 rounded shadow-sm relative">
            <img
              src="https://via.placeholder.com/200"
              alt="RGB liquid CPU Cooler"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              RGB liquid CPU Cooler
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-500 font-semibold">$1960</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded">
              Add To Cart
            </button>
          </div>
          <div className="border p-4 rounded shadow-sm relative">
            <img
              src="https://via.placeholder.com/200"
              alt="GP11 Shooter USB Gamepad"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              GP11 Shooter USB Gamepad
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-500 font-semibold">$550</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded">
              Add To Cart
            </button>
          </div>
          <div className="border p-4 rounded shadow-sm relative">
            <img
              src="https://via.placeholder.com/200"
              alt="Quilted Satin Jacket"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Quilted Satin Jacket</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-500 font-semibold">$750</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
