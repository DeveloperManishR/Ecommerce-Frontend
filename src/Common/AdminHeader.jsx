import React, { useState, useRef, useEffect } from 'react';
import { BellIcon } from "@heroicons/react/24/outline"; // Keeping only BellIcon for clarity
import { useSocket } from '../config/SocketContext';
import { useSelector } from 'react-redux';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown
  const UserId = useSelector((state) => state?.auth?.user?.id);

  const socket=useSocket()

  const [allNotifications, setallNotifications] = useState([
    { id: 1, message: 'Order #3201 has been shipped.' },
    { id: 2, message: 'New customer signed up: Olivia Martin.' },
    { id: 3, message: 'Order #3204 is still unfulfilled.' },
    { id: 4, message: 'Product inventory is running low.' },
  ])

  console.log("allNotifications",allNotifications)

  const notifications = [
    { id: 1, message: 'Order #3201 has been shipped.' },
    { id: 2, message: 'New customer signed up: Olivia Martin.' },
    { id: 3, message: 'Order #3204 is still unfulfilled.' },
    { id: 4, message: 'Product inventory is running low.' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  useEffect(() => {
    const handleNewNotification = (notification) => {
      console.log("notification",notification.message)
        setallNotifications([{id:Math.random(),message:notification.message},...allNotifications])
    };

    if (socket) {
       console.log("socke",socket)
      socket.on("newNotification", handleNewNotification);
    }

    return () => {
      if (socket) {
        socket.off("newNotification", handleNewNotification);
      }
    };
  }, [UserId, socket]);

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between relative">
      <div>
        <h1 className="text-xl font-bold">Acme Inc</h1>
      </div>
      <div className="flex items-center">
        {/* Notification Bell Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative focus:outline-none"
          >
            <BellIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div
              ref={dropdownRef} // Attach ref to the dropdown
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"
            >
              <div className="p-4">
                <h4 className="font-semibold text-lg">Notifications</h4>
                <ul className="divide-y divide-gray-200">
                  {allNotifications.length ? (
                    allNotifications.map((notification) => (
                      <li key={notification.id} className="py-2">
                        {notification.message}
                      </li>
                    ))
                  ) : (
                    <li className="py-2 text-gray-500">No notifications available</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
