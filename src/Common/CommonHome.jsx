import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { withoutAuthAxios } from "../config/config";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { handleImage } from "../../utils/helper";
import Footer from "./Footer";
import { FaHeart, FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const CommonHome = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);

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

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  useEffect(() => {
    fetchAllproducts();
    fetchAllproductsCategory();
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto">
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-lg"
          src="https://images.unsplash.com/photo-1718627829230-a3f11114adb5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gamepad"
        />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
          -40%
        </span>
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button className="text-white-500 hover:text-white-700">
            <FaEye className="w-6 h-6" />
          </button>
          <button className="text-white-500 hover:text-white-700">
            <FaHeart className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">HAVIT HV-G92 Gamepad</h3>
        <div className="flex items-center mt-2">
          <span className="text-red-600 text-xl font-bold">$120</span>
          <span className="text-gray-500 line-through ml-2">$160</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <AiFillStar className="text-yellow-500" />
            <span className="ml-1 text-sm text-gray-600">(88)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonHome;
