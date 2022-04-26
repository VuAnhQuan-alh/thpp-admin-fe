import React from "react";
import { Redirect } from "react-router-dom";
// Authentication related pages
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
// Profile
// import UserProfile from "../pages/Authentication/user-profile"
import DanhSachGD from "../pages/DanhSachGD";
import DoiSoatGD from "../pages/DoiSoatGD";
import BaoCaoDoanhThu from "../pages/BaoCaoDoanhThu";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";
import AdminSite from "../pages/AdminSite";
import NotAuth from "../pages/NotAuth";

const userRoutes = [
  {
    path: "/Doi-soat-giao-dich/:id",
    component: DoiSoatGD,
    role: "TRANSACTION_CONTROL",
    not: NotAuth,
  },
  {
    path: "/Doi-soat-giao-dich",
    component: DoiSoatGD,
    role: "TRANSACTION_CONTROL",
    not: NotAuth,
  },
  {
    path: "/Danh-sach-giao-dich",
    component: DanhSachGD,
    role: "TRANSACTION_LIST",
    not: NotAuth,
  },
  {
    path: "/Bao-cao-doanh-thu",
    component: BaoCaoDoanhThu,
    role: "SALES_REPORT",
    not: NotAuth,
  },
  {
    path: "/Quan-tri",
    component: AdminSite,
    role: "ADMINISTRATION",
    not: NotAuth,
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/Doi-soat-giao-dich" />,
    not: () => <Redirect to="/Doi-soat-giao-dich" />,
  },
];

const authRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },
];

export { userRoutes, authRoutes };
