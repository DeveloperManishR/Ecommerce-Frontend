import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Common/Login";
import Signup from "../Common/Signup";
import Home from "../Components/User/Home";
import PrivateUserRoute from "./PrivateUserRoute";
import Wishlist from "../Components/User/Wishlist";

export const Routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={ <PrivateUserRoute>    <Home /> </PrivateUserRoute>} />
          <Route path="/wishlist" element={ <PrivateUserRoute>    <Wishlist /> </PrivateUserRoute>} />

        </Routes>
      </Router>
    </>
  );
};
