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
import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { MdOutlineStarOutline } from "react-icons/md";

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
    <>
      <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
        <div className="w-full h-60 relative p-2 group">
          <img
            //  onClick={handleProduct}
            // src={item?.images[0]}
            alt="productImage"
            className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
          />
          <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
            <span
              //  onClick={handleFavorite}
              className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
            >
              {/* {existingProduct ? <FaStar /> : } */}
              <FaRegStar />
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
            erwrere
          </h3>
          <h2 className="text-lg font-bold line-clamp-2">dfd</h2>
          <div className="text-base text-lightText flex items-center">
            <MdOutlineStarOutline />
            <MdOutlineStarOutline />
            <MdOutlineStarOutline />
            <MdOutlineStarOutline />
            <MdOutlineStarOutline />
          </div>
          {/* <AddToCartBtn product={item} /> */}
        </div>
        {/* <Transition appear show={isOpen}>
          <Dialog
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform-[scale(95%)]"
                  enterTo="opacity-100 transform-[scale(100%)]"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform-[scale(100%)]"
                  leaveTo="opacity-0 transform-[scale(95%)]"
                >
                  <DialogPanel className="w-full max-w-md rounded-xl bg-black backdrop-blur-2xl z-50 p-6">
                    <DialogTitle
                      as="h3"
                      className="text-base/7 font-medium text-whiteText"
                    >
                      Hurry up!
                    </DialogTitle>
                    <p className="mt-2 text-sm/6 text-white/50">
                      You are going to save{" "}
                      <span className="text-skyText">
                        <FormattedPrice
                          amount={item?.regularPrice - item?.discountedPrice}
                        />{" "}
                      </span>
                      from this product.
                    </p>
                    <p className="text-sm/6 text-white/50">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sequi, consequatur?
                    </p>
                    <div className="mt-4">
                      <Button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                       // onClick={close}
                      >
                        Got it, thanks!
                      </Button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition> */}
      </div>
    </>
  );
};

export default CommonHome;
