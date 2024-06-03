import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PrivateAdminLayout from "../Layout/PrivateAdminLayout";

export default function PrivateAdminRoute({ children }) {
  //const accessToken = useSelector((state) => state.auth.accessToken);
  const {accessToken}=useSelector((state)=>state.auth)

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <PrivateAdminLayout children={children} />;
}
