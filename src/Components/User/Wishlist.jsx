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
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Wishlist Products</h1>
      </div>

      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {wishlistProducts.map((item) => (
          <>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <IoIosCloseCircleOutline
                onClick={() => removeWishlistProduct(item._id)}
              />
              <img
                src={handleImage(item?.wishlist.images[0])}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />

              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {item.wishlist.title}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  Product Name
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${item.wishlist.price}
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      ${item.wishlist.price}
                    </p>
                  </del>
                  <div onClick={() => addTocart(item)} className="ml-auto">
                    <RiShoppingBagLine className="text-4xl w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </section>
    </div>
  );
};

export default Wishlist;
