import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../Common/Login';
import Signup from '../Common/Signup';
import CommonHome from '../Common/CommonHome';
import PrivateUserLayout from '../Layout/PrivateUserLayout';
import Wishlist from "../Components/User/Wishlist"
import UserHome from '../Components/User/UserHome';
export const Routing = () => {
  return (
    <> 
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={ <CommonHome /> } />
        <Route path="/wishlist" element={<PrivateUserLayout> <UserHome /> </PrivateUserLayout> } />
        <Route path="/home" element={<PrivateUserLayout> <Wishlist /> </PrivateUserLayout> } />

      
        
        </Routes>
        </Router>
        </>
  )
}
