import React from "react";
import SideBar from "../Common/SideBar";
import TopBar from "../Common/TopBar";

export default function PrivateUserLayout({ children, activeSubMenu }) {
  return (
    <div class="flex  h-full w-full">
      {/* <SideBar /> */}
      <div className="w-[calc(100%-0px)] bg-lightgray  ml-[auto] side--content--area">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
