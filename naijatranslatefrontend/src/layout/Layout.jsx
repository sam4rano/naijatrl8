import { Outlet } from "react-router-dom";
import TranslateForm from "../components/TranslateForm";
import Navbar from "../navbar/Navbar";
import Ads from "../utils/Ads";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [isDivVisible, setDivVisibility] = useState(true);

  const toggleDivVisibility = () => {
    setDivVisibility(!isDivVisible);
  };

  return (
    <div className="bg-graylight">
      <Navbar />
      {isDivVisible && <Ads toggleDivVisibility={toggleDivVisibility} />}
      <Outlet />
    </div>
  );
};

export default Layout;
