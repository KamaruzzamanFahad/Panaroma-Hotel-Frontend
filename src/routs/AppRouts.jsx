import React from 'react'
import { Route, Routes } from 'react-router'
import MainLayouts from '../layouts/MainLayouts'
import Home from '../pages/home'
import Register from '../pages/regester'
import axios from 'axios'
import Login from '../pages/login'
import ResetPassword from '../pages/reset'
import ResetPasswordConfirm from '../pages/reset_password_confirm'
import Activate from '../pages/activate'
import ResendVerification from '../pages/resendemail'
import HotelDetailsPage from '../pages/HotelDetils'
import HotelDashboard from '../layouts/Dashboard'
import PaymentStatus from '../layouts/PaymentStatus'
import HotelList from '../components/HotelList'

const AppRouts = () => {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "https://penorama-hotel.vercel.app/api/v1/";

  return <Routes>
    <Route path="/" element={<MainLayouts />} >
      <Route index element={<Home />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/reset-password" element={<ResetPassword />} />
      <Route path="auth/reset/:uid/:token" element={<ResetPasswordConfirm />} />
      <Route path="auth/activate/:uid/:token" element={<Activate />} />
      <Route path="auth/resend-verification" element={<ResendVerification />} />
      <Route path="hotel/:id" element={<HotelDetailsPage />} />
      <Route path="hotels" element={<HotelList />} />
    </Route>
    <Route path="/dashboard" element={<HotelDashboard />} >
      <Route index element={<HotelDashboard />} />
      
    </Route>
    <Route path="/dashboard/payment" element={<PaymentStatus />} />
    
  </Routes>
}

export default AppRouts

