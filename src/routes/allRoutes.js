import React from "react"
import { Redirect } from "react-router-dom"
// Authentication related pages
import Login from "../pages/Authentication/Login"
import Register from "../pages/Authentication/Register"
// Profile
import UserProfile from "../pages/Authentication/user-profile"
import DanhSachGD from "../pages/DanhSachGD"
// Dashboard
// import Dashboard from "../pages/Dashboard/index"
import Dashboard2 from "../pages/Dashboard2.js/index.js"
import DoiSoatGDVNPay from "../pages/DoiSoatGDVNPay"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"


const userRoutes = [
  { path: "/Doi-soat-giao-dich-VNPay", component: DoiSoatGDVNPay },
  { path: "/Danh-sach-giao-dich", component: DanhSachGD },
  { path: '/dashboard2', component: Dashboard2 },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/Doi-soat-giao-dich-VNPay" /> },
]

const authRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },
]

export { userRoutes, authRoutes }
