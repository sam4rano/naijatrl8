import TranslateForm from "../components/TranslateForm";
import Navbar from "../navbar/Navbar";
import Ads from "../utils/Ads";
import { Outlet } from "react-router-dom";


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
