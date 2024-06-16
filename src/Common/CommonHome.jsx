import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { withoutAuthAxios } from "../config/config";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { handleImage } from "../../utils/helper";
import Footer from "./Footer";

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

  console.log(products);
  useEffect(() => {
    fetchAllproducts();
    fetchAllproductsCategory();
  }, []);
  return (
    <div>
      <div className="px-6">
        <section className="p-6">
          <h2 className="text-2xl font-bold mb-4">Flash Sales</h2>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
          >
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg w-60">
                <div className="relative">
                  <img
                    src={handleImage(product?.images[0])}
                    alt={product.name}
                    className="w-full h-32 object-cover mb-2"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    {product.discount}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-red-500">
                  {product.price}{" "}
                  <span className="line-through">{product.oldPrice}</span>
                </p>
              </div>
            ))}
          </Carousel>
          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
              View All Products
            </button>
          </div>
        </section>

        <section className="p-6">
          <h2 className="text-2xl font-bold mb-4">Browse By Category</h2>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
          >
            {category.map((category) => (
              <div
                key={category?.id}
                className="border p-4 rounded-lg flex flex-col items-center w-40"
              >
                <img
                  src={category?.icon}
                  alt={category?.name}
                  className="w-16 h-16 mb-2"
                />
                <p>{category}</p>
              </div>
            ))}
          </Carousel>
        </section>


        <Footer/>

     
      </div>
    </div>
  );
};

export default CommonHome;
