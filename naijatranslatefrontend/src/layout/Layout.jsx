import TranslateForm from "../components/TranslateForm";
import Navbar from "../navbar/Navbar";
import Ads from "../utils/Ads";
import { Outlet } from "react-router-dom";
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
      <div className="z-10">
        <TranslateForm />
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
