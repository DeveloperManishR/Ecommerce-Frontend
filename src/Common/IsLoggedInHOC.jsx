import React from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import { logout } from "../Redux/Reducers/authSlice";
import { useDispatch } from "react-redux";

const IsLoggedinHOC = (WrappedComponent) => {
  const HocComponent = ({ ...props }) => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);

    const { isExpired } = useJwt(accessToken);
    if (isExpired) {
      dispatch(logout());
    } else {
      return <WrappedComponent {...props} isTokenExpired={isExpired} />;
    }
  };
  return HocComponent;
};
export default IsLoggedinHOC;
