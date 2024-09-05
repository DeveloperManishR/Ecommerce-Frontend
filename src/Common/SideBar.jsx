import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-white shadow-md ${
        isOpen ? "w-64" : "w-16"
      } min-h-screen transition-width duration-300`}
    >
      <button
        className="p-4 focus:outline-none text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "←" : "→"}
      </button>
      <div className="mt-4">
        <ul className="space-y-4">
          <Link to="/user-orders">
            <li className="p-4 hover:bg-gray-200">
              <span className={isOpen ? "inline" : "hidden"}> Orders</span>
              <span className={!isOpen ? "inline" : "hidden"}>O</span>
            </li>
          </Link>
          <Link to="/all-products">
            <li className="p-4 hover:bg-gray-200">
              <span className={isOpen ? "inline" : "hidden"}>Products</span>
              <span className={!isOpen ? "inline" : "hidden"}>P</span>
            </li>
          </Link>
          <Link to="/all-users">
            <li className="p-4 hover:bg-gray-200">
              <span className={isOpen ? "inline" : "hidden"}>Users</span>
              <span className={!isOpen ? "inline" : "hidden"}>U</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
