import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="p-5">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
