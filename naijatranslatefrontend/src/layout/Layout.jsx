import TranslateForm from "../components/TranslateForm";
import Navbar from "../navbar/Navbar";
import Ads from "../utils/Ads";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [isDivVisible, setDivVisibility] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDivVisibility = () => {
    setDivVisibility(!isDivVisible);
  };

  const handleLogin = () => {
    // Your login logic here, set isLoggedIn to true after successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Your logout logic here, set isLoggedIn to false after logout
    setIsLoggedIn(false);
  };

  return (
    <div className="bg-graylight">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      {isDivVisible && <Ads toggleDivVisibility={toggleDivVisibility} />}
      <div className="z-10">
        <TranslateForm />
      </div>


    </div>
  );
};

export default Layout;
