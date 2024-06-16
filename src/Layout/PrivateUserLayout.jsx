import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

export default function PrivateUserLayout({ children, activeSubMenu }) {
  return (
    <div class="flex  h-full w-full">
     
      <div className="w-[calc(100%-0px)] bg-lightgray  ml-[auto] side--content--area">
        <Header />
        {children}
        <Footer/>
      </div>
     
    </div>
  );
}
