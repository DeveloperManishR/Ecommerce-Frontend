import React, { useEffect, useState } from "react";
import ProductCard from "../../Common/ProductCard";
import { authAxios } from "../../config/config";

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

  const addTowishlist=()=>{

  }

  console.log(wishlistProducts)

  useEffect(() => {
    getAllwishlistProducts();
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Wishlist Products
        </h2>

        {/* <ProductCard
          data={wishlistProducts}
          addTowishlist={addTowishlist}
        //   wishlistProducts={wishlistProducts}
        /> */}
      </div>
    </div>
  );
};

export default Wishlist;
