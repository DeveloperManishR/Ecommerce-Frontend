import React, { useEffect, useState } from "react";

import { withoutAuthAxios } from "../../config/config";
import { handleImage } from "../../utils/helper";
import ProductCard from "../../Common/ProductCard";
const Home = () => {
  const [products, setproducts] = useState([]);
  const [category, setcategory] = useState([]);

  const fetchAllproducts = async () => {
    await withoutAuthAxios()
      .get("/product/get-all-products")
      .then((response) => {
        const resData = response.data;

        setproducts(resData.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const fetchAllproductsCategory = async () => {
    await withoutAuthAxios()
      .get("/product/get-all-category")
      .then((response) => {
        const resData = response.data;
        console.log("res", resData);
        setcategory(resData.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchAllproducts();
    fetchAllproductsCategory();
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <ProductCard data={products} />
      </div>
    </div>
  );
};

export default Home;
