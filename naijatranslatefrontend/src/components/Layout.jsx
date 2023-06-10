import TranslateForm from "./TranslateForm";
import Navbar from "./Navbar";
import Ads from "./Ads";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Ads />
      <TranslateForm />
      <Outlet />
    </>
  );
};

export default Layout;
