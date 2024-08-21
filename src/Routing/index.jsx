import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Common/Login";
import Signup from "../Common/Signup";
import Home from "../Components/User/Home";
import PrivateUserRoute from "./PrivateUserRoute";
import Wishlist from "../Components/User/Wishlist";
import Cart from "../Components/User/Cart";
import Checkout from "../Components/User/Checkout";
import ThankyouPage from "../Common/ThankyouPage";
import Orders from "../Components/User/Orders";
import ProductDetail from "../Common/ProductDetail";
import ProductInfo from "../Common/ProductInfo";

export const Routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateUserRoute>
                {" "}
                <Home />{" "}
              </PrivateUserRoute>
            }
          />
          <Route
            path="/product-info/:id"
            element={
              <PrivateUserRoute>
                {" "}
                <ProductInfo />{" "}
              </PrivateUserRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateUserRoute>
                {" "}
                <Wishlist />{" "}
              </PrivateUserRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateUserRoute>
                {" "}
                <Cart />{" "}
              </PrivateUserRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateUserRoute>
                {" "}
                <Checkout />{" "}
              </PrivateUserRoute>
            }
          />
          <Route
            path="/thank-you"
            element={
              <PrivateUserRoute>
                {" "}
                <ThankyouPage />{" "}
              </PrivateUserRoute>
            }
          />
           <Route
            path="/orders"
            element={
              <PrivateUserRoute>
                {" "}
                <Orders />{" "}
              </PrivateUserRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};
