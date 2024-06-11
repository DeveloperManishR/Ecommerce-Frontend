import React from 'react'
import SideBar from '../Common/SideBar'
import TopBar from '../Common/TopBar'
import AdminTopbar from '../Common/AdminTopbar'

export default function PrivateAdminLayout({ children, activeSubMenu }) {
  return (
    <div className="flex ">
    <SideBar  />
    <div className="content--area w-full">
      <AdminTopbar  />
      <div className="inner--content p-5">
        {children}
      </div>
    </div>
  </div>
  )
}
