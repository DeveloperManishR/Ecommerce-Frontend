import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { authAxios } from "../config/config";
import { CiHeart } from "react-icons/ci";
import { toast } from "react-toastify";
import ProductDetail from "./Models/ProductDetail";
import { handleImage } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CommonHome = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);

  const [productDetail, setproductDetail] = useState({
    data: [],
    show: false,
  });

  const fetchAllproducts = async () => {
    await authAxios()
      .get("/product/get-all-products")
      .then((response) => {
        const resData = response.data;

        setproducts(resData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTocart = async () => {
    navigate("/login");
  };

  const addTowishlist = async () => {
    navigate("/login");
  };

  const handleViewProductDetail = (item) => {
    setproductDetail((prev) => ({
      ...prev,
      data: item,
      show: true,
    }));
  };

  useEffect(() => {
    fetchAllproducts();
    if (accessToken) {
      navigate("/home");
    }
  }, []);

  return (
    <div class="flex items-center bg-white-100 min-h-screen">
      <div class="container ml-auto mr-auto flex flex-wrap items-start">
        <div class="w-full pl-5 lg:pl-2 mb-4 mt-4">
          <h1 class="text-3xl lg:text-4xl text-gray-700 font-extrabold"></h1>
        </div>

        {products &&
          products.map((item) => (
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  src={handleImage(item.images[0])}
                  alt="Shoes"
                  className="w-96 h-96"
                />
              </figure>
              <div className="card-body">
                <h2 className="font-bold  text-center">{item?.title}</h2>
                <div className="p-3 flex items-start justify-between gap-1 py-5">
                  <p className="card-title"> ${item.price}</p>
                  <EyeIcon
                    onClick={() => handleViewProductDetail(item)}
                    className="h-6 w-6 cursor-pointer text-gray-500 float-right"
                  />
                </div>
              </div>
            </div>
          ))}
        {productDetail.show && (
          <ProductDetail
            addTocart={addTocart}
            addTowishlist={addTowishlist}
            setproductDetail={setproductDetail}
            productDetail={productDetail}
          />
        )}
      </div>
    </div>
  );
};

export default CommonHome;
