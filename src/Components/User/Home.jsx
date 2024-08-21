import React, { useEffect, useState } from "react";

import { authAxios, withoutAuthAxios } from "../../config/config";
import { handleImage } from "../../utils/helper";
import ProductCard from "../../Common/ProductCard";
import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { MdOutlineStarOutline } from "react-icons/md";
import { toast } from "react-toastify";
import ProductDetail from "../../Common/ProductDetail";
import HomePageList from "../../Common/HomePageList";
import { IoMdCart } from "react-icons/io";
const Home = () => {
  const [products, setproducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [wishlistProducts, setwishlistProducts] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(20);
  const [totalPosts, settotalPosts] = useState(0);

  const [currentImagedata, setcurrentImagedata] = useState({
    data: "",
  });
  const [allmodel, setallmodel] = useState({
    data: {},
    showProductDetail: false,
  });

  const fetchAllproducts = async () => {
    await withoutAuthAxios()
      .get(
        `/product/get-all-products/?page=${currentPage}&limit=${postsPerPage}`
      )
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

  const addTowishlist = async (id) => {
    await authAxios()
      .post(`/wishlist/add-to-wishlist/${id}`)
      .then((response) => {
        fetchAllproducts();
        getAllwishlistProducts();

      //  toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const removeWishlistProduct = async (id) => {
    const ids = wishlistProducts.find((item) => item.wishlist._id == id);
    console.log(ids);
    await authAxios()
      .delete(`/wishlist/delete-wishlist-product/${ids._id}`)
      .then((response) => {
        const resData = response.data;

       // toast.success(resData.message);
        getAllwishlistProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleViewProduct = async (item) => {
    setallmodel((prev) => ({
      ...prev,
      showProductDetail: true,
      data: item,
    }));
  };
  
  const addTocart = async (item) => {
    await authAxios()
      .post(`/cart/add-to-cart/${item._id}`)
      .then((response) => {
      //  removeWishlistProduct(item._id);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchAllproducts();
    //  fetchAllproductsCategory();
    getAllwishlistProducts();
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((item) => (
              <div key={item.id} className="group relative">
                <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
                  <div className="w-full h-60 relative p-2 group">
                    <img
                      src={handleImage(item.images[0])}
                      alt="productImage"
                      className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
                    />
                    <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
                      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                        {wishlistProducts?.some(
                          (job) => job?.wishlist._id == item?._id
                        ) ? (
                          <FaStar
                            onClick={() => removeWishlistProduct(item._id)}
                          />
                        ) : (
                          <FaRegStar onClick={() => addTowishlist(item._id)} />
                        )}
                      </span>
                      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                        <LuArrowLeftRight />
                      </span>
                      <span
                        onClick={() => handleViewProduct(item)}
                        className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
                      >
                        <FaRegEye />
                      </span>
                      <span onClick={()=>addTocart(item)} className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
                        <IoMdCart />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 px-2 pb-2">
                    <h3 className="text-xs uppercase font-semibold text-lightText">
                      {item.category}
                    </h3>
                    <h2 className="text-lg font-bold line-clamp-2">
                      {item.title}
                    </h2>
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

        {/* <HomePageList/> */}

        {allmodel.showProductDetail && (
          <ProductDetail allmodel={allmodel} setallmodel={setallmodel} />
        )}
      </div>
    </div>
  );
};

export default Home;
