import React from "react";
import { handleImage } from "../utils/helper";
import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { MdOutlineStarOutline } from "react-icons/md";

const ProductCard = ({ data, addTowishlist, wishlistProducts }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {data.map((item) => (
        <div key={item.id} className="group relative">
          <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
            <div className="w-full h-60 relative p-2 group">
              <img
                src={handleImage(item.images[0])}
                alt="productImage"
                className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
              />
              <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
                <span
                  
                  //  onClick={handleFavorite}
                  //  onClick={handleFavorite}
                  className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
                >
                  {/* {existingProduct ? <FaStar /> : } */}
                  <FaStar onClick={()=>addTowishlist(item._id)}  />

                  {/* {wishlistProducts &&
                    wishlistProducts.length > 0 &&
                    wishlistProducts.some((wishlist) =>
                      wishlist._id === item._id ? <FaStar onClick={addTowishlist}  /> : <FaRegStar />
                    )} */}
                </span>
                <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                  <LuArrowLeftRight />
                </span>
                <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                  <FaRegEye />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-2 pb-2">
              <h3 className="text-xs uppercase font-semibold text-lightText">
                {item.category}
              </h3>
              <h2 className="text-lg font-bold line-clamp-2">{item.title}</h2>
              <div className="text-base text-lightText flex items-center">
                <MdOutlineStarOutline />
                <MdOutlineStarOutline />
                <MdOutlineStarOutline />
                <MdOutlineStarOutline />
                <MdOutlineStarOutline />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
