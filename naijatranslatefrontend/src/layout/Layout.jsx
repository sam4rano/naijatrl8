import { useState } from "react";
import TranslateForm from "../components/TranslateForm";
import Navbar from "../navbar/Navbar";
import Ads from "../utils/Ads";
import { Outlet } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div className="bg-graylight">
      <Navbar />
      <Ads />
      <TranslateForm />
      <Outlet />    
    </div>
  );
};

export default Layout;
