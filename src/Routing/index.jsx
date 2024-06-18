import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../Common/Login';
import Signup from '../Common/Signup';
import CommonHome from '../Common/CommonHome';
import PrivateUserLayout from '../Layout/PrivateUserLayout';

export const Routing = () => {
  return (
    <> 
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateUserLayout> <CommonHome /> </PrivateUserLayout> } />
      
        
        </Routes>
        </Router>
        </>
  )
}
