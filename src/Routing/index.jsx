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
import { useSelector } from "react-redux";
import PrivateAdminRoute from "./PrivateAdminRoute";
import AdminHome from "../Components/Admin/Home";
import AOrders from "../Components/Admin/Orders";
import Products from "../Components/Admin/Products";
import AdminOrders from "../Components/Admin/Orders";
import Users from "../Components/Admin/Users";
import NormalUserLayout from "../Layout/NormalUserLayout";
import NormalUserHome from "../Components/NormalUser/NormalUserHome";

export const Routing = () => {
  const userRole = useSelector((state) => state.auth.user.role);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {userRole == "USER" ? (
            <Route
              path="/"
              element={
                <PrivateUserRoute>
                  {" "}
                  <Home />{" "}
                </PrivateUserRoute>
              }
            />
          ) : userRole == "ADMIN" ? (
            <Route
              path="/"
              element={
                <PrivateAdminRoute>
                  {" "}
                  <AdminHome />{" "}
                </PrivateAdminRoute>
              }
            />
          ) : (
            <>
              <Route path="/" element={<NormalUserLayout> <NormalUserHome />  </NormalUserLayout>} />
            </>
          )}

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
            path="/all-users"
            element={
              <PrivateAdminRoute>
                {" "}
                <Users />{" "}
              </PrivateAdminRoute>
            }
          />

          <Route
            path="/user-orders"
            element={
              <PrivateAdminRoute>
                {" "}
                <AdminOrders />{" "}
              </PrivateAdminRoute>
            }
          />

          <Route
            path="/all-products"
            element={
              <PrivateAdminRoute>
                {" "}
                <Products />{" "}
              </PrivateAdminRoute>
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
