import InputOutputBox from "./inputOutputBox";
import Navbar from "./Navbar";
import Ads from "./Ads";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Ads />
      <InputOutputBox />
      <Outlet />
    </>
  );
};

export default Layout;
