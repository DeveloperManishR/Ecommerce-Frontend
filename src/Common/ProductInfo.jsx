import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authAxios } from "../config/config";
import { dateFormat, handleImage } from "../utils/helper";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import DynamicRating from "./DynamicRating";
import CheckoutCart from "../Components/User/CheckoutCart";

const ProductInfo = () => {
  const [ProductDetail, setProductDetail] = useState([]);
  const [allReview, setallReview] = useState([]);
  const [displayImage, setdisplayImage] = useState("");
  const params = useParams();
  const { id } = params;
  const [showcart, setshowcart] = useState(false);

  console.log("produ", ProductDetail);

  useEffect(() => {
    fetchProductDetail(id);
  }, []);
  const fetchProductDetail = async (id) => {
    await authAxios()
      .get(`/product/getproduct-detail/${id}`)
      .then((response) => {
        console.log("res", response);
        fetchProductReview();
        setProductDetail(response.data.data);
        setdisplayImage(response.data.data.images[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchProductReview = async () => {
    await authAxios()
      .get(`/review/get-product-review/${id}`)
      .then((response) => {
        setallReview(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  const addTocart = async () => {
    console.log("cfsdadfaddfdfs")
    await authAxios()
      .post(`/cart/add-to-cart/${ProductDetail?._id}`)
      .then((response) => {
        // toast.success(response.data.message);
        setshowcart(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  console.log("all", allReview);

  return (
    <div className="font-sans">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="min-h-[500px] lg:col-span-3 bg-gradient-to-tr  from-[#F8C794] via-[#FFE0B5] to-[#FFF2D7] rounded-lg w-full lg:sticky top-0 text-center p-6">
            <img
              src={ handleImage(displayImage)}
              alt="Product"
              className="w-3/5 rounded object-cover mx-auto py-6"
            />

            <hr className="border-white border my-6" />

            <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center mx-auto">
              {ProductDetail.images &&
                ProductDetail.images.map((item) => (
                  <>
                    {displayImage !== item && (
                      <div className="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-[#fff2c9] p-3 rounded-lg">
                        <img
                          onClick={() => setdisplayImage(item)}
                          src={handleImage(item)}
                          alt="Product1"
                          className="w-full h-full cursor-pointer"
                        />
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {ProductDetail?.title} | {ProductDetail?.category}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">
                ${ProductDetail?.price}
              </p>
              {/* <p className="text-gray-400 text-xl">
                <strike>$16</strike>{" "}
                <span className="text-sm ml-1">Tax included</span>
              </p> */}
            </div>

            <div className="flex space-x-2 mt-4">
              {/* <svg
                className="w-5 fill-orange-400"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-orange-400"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-orange-400"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-orange-400"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg> */}
              <DynamicRating rating={ProductDetail.rating} />
            </div>

            <div className="mt-8">
              <h6 className="text-xl font-medium text-gray-800">
                {ProductDetail.description}
              </h6>
              {/* <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                <li>
                  A cup of coffee is a beverage essential because of its
                  timeless appeal
                </li>
                <li>
                  Easy to prepare. It can be brewed using various methods, from
                  drip machines to manual pour-overs.
                </li>
                <li>
                  Available in various sizes, from a standard espresso shot to a
                  large Americano, catering to different preferences.
                </li>
                <li>
                  You can customize your coffee by adding cream, sugar, or
                  flavorings to suit your taste preferences.
                </li>
              </ul> */}
            </div>

            <button
                // onClick={() => addTocart(item)}
                onClick={()=>addTocart()}
              type="button"
              className="w-full mt-8 px-6 py-3 bg-black hover:bg-gray-500 text-white text-sm font-semibold rounded-md"
            >
              Add to cart
            </button>


            {showcart && (
          <CheckoutCart showcart={showcart} setshowcart={setshowcart} />
        )}

            {/* <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
              <div className="space-y-3 mt-4">
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">5.0</p>
                  <svg
                    className="w-5 fill-orange-400 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-300 rounded w-full h-2 ml-3">
                    <div className="w-2/3 h-full rounded bg-orange-400"></div>
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">4.0</p>
                  <svg
                    className="w-5 fill-orange-400 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-300 rounded w-full h-2 ml-3">
                    <div className="w-1/3 h-full rounded bg-orange-400"></div>
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">3.0</p>
                  <svg
                    className="w-5 fill-orange-400 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-300 rounded w-full h-2 ml-3">
                    <div className="w-1/6 h-full rounded bg-orange-400"></div>
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">2.0</p>
                  <svg
                    className="w-5 fill-orange-400 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-300 rounded w-full h-2 ml-3">
                    <div className="w-1/12 h-full rounded bg-orange-400"></div>
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">1.0</p>
                  <svg
                    className="w-5 fill-orange-400 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-300 rounded w-full h-2 ml-3">
                    <div className="w-[6%] h-full rounded bg-orange-400"></div>
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                </div>
              </div>

              {allReview &&
                allReview.length > 0 &&
                allReview.map((item) => (
                  <>
                    <div className="flex items-start mt-8">
                      <img
                        src="https://readymadeui.com/team-2.webp"
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div className="ml-3">
                        <h4 className="text-sm font-bold">
                          {item.userid.fname} {item.userid.lname}{" "}
                        </h4>
                        <div className="flex space-x-1 mt-1">
                          <Rating
                            style={{ maxWidth: 100 }}
                           
                            value={item.rating}
                            size={25}
                            transition
                            fillColor="yellow"
                            emptyColor="gray"
                          />
                          <p className="text-xs !ml-2 font-semibold">
                            {" "}
                            {dateFormat(item.createdAt)}
                          </p>
                        </div>
                        <p className="text-xs mt-4">{item.comment}</p>
                      </div>
                    </div>
                  </>
                ))}

            
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
