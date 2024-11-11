import React, { useEffect, useState } from "react";
import ProductCard from "../../Common/ProductCard";
import { authAxios } from "../../config/config";
import { handleImage } from "../../utils/helper";
import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

import { LuArrowLeftRight } from "react-icons/lu";
import { MdOutlineStarOutline } from "react-icons/md";
import { toast } from "react-toastify";
import ProductDetail from "../../Common/ProductDetail";
import CheckoutCart from "./CheckoutCart";
import DynamicRating from "../../Common/DynamicRating";
import { Link } from "react-router-dom";
const Wishlist = () => {
  const [wishlistProducts, setwishlistProducts] = useState([]);

  const [showcart, setshowcart] = useState(false)
  const [allmodel, setallmodel] = useState({
    data:{},
    showProductDetail:false
  })

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
    await authAxios()
      .delete(`/wishlist/delete-wishlist-product/${id}`)
      .then((response) => {
        const resData = response.data;

     //   toast.success(resData.message);
        getAllwishlistProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleViewProduct=async(item)=>{
   setallmodel((prev)=>({
    ...prev,
    showProductDetail:true,
    data:item.wishlist
   }))
  }

  const addTocart = async (item) => {
    await authAxios()
      .post(`/cart/add-to-cart/${item.wishlist._id}`)
      .then((response) => {
        removeWishlistProduct(item._id);
        setshowcart(true)
     //   toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  

  useEffect(() => {
    getAllwishlistProducts();
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 onClick={()=>setshowcart(true)} className="text-2xl font-bold tracking-tight text-gray-900">
          Wishlist Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {wishlistProducts &&wishlistProducts.length>0&&
            wishlistProducts.map((item) => (
              <div key={item.id} className="group relative">
                <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
                  <div className="w-full h-60 relative p-2 group">
                  <Link to={`/product-info/${item?.wishlist?._id}`}>
                    <img
                      src={handleImage(item?.wishlist?.images[0])}
                      alt="productImage"
                      className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
                    />
                    </Link>

                    <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
                      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                        <FaStar
                          onClick={() => removeWishlistProduct(item._id)}
                        />
                      </span>
                      {/* <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                        <LuArrowLeftRight />
                      </span> */}
                      <span onClick={()=>handleViewProduct(item)} className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                        <FaRegEye />
                      </span>

                      <span onClick={()=>addTocart(item)} className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                        <IoMdCart />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 px-2 pb-2">
                    <h3 className="text-xs uppercase font-semibold text-lightText">
                      {item.wishlist.category}
                    </h3>
                    <h2 className="text-lg font-bold line-clamp-2">
                      {item.wishlist.title}
                    </h2>
                    <div className="text-base text-lightText flex items-center">
                      <DynamicRating rating={item?.wishlist?.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {
          allmodel.showProductDetail&& <ProductDetail allmodel={allmodel} setallmodel={setallmodel} />
        }

        {
          showcart&& <CheckoutCart showcart={showcart} setshowcart={setshowcart}/>
        }


      </div>
    </div>
  );
};

export default Wishlist;
