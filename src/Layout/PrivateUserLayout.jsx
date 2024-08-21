import React from "react";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

export default function PrivateUserLayout({ children, activeSubMenu }) {
  return (
    <div className="flex  h-full w-full">
     
      <div className="w-[calc(100%-0px)] bg-lightgray  ml-[auto] side--content--area">
       <Header/>
        {children}
        <Footer/>
      </div>
     
    </div>
  );
}
