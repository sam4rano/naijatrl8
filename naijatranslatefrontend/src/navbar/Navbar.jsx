import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../utils/Title";
import close from "../assets/open.svg";
import open from "../assets/close.svg";
import Sidebar from "./Sidebar";
import history from "../assets/history.svg";
import feedback from "../assets/feedback.svg";
import contact from "../assets/contact.svg";
import upload from "../assets/upload.svg";

const Navbar = ({ isLoggedin, handleLogout }) => {
  const [navbar, setNavbar] = useState(false);

  const handleClose = () => {
    setNavbar(false);
  };
  const handleOpen = () => {
    setNavbar(true);
  };
  return (
    <div className="h-[70px] p-[10px] flex flex-row justify-between">
      <div className="flex">
        <div
          className=" text-dark focus:border-gray-400 cursor-pointer"
          onClick={() => setNavbar(!navbar)}
        >
          {!navbar && <img src={close} alt="close" onClick={handleClose} />}
          {navbar && (
            <img
              src={open}
              alt="open"
              onClick={handleOpen}
              className="w-[25px] h-[25px]"
            />
          )}
          {navbar && (
            <ul className="w-[200px] absolute p-[10px] rounded-[16px] h-screen z-30 bg-gray flex flex-col gap-lg">
              <li className="">
                <Link
                  to="help_center"
                  className="flex mb-[20px] hover:bg-light"
                >
                  <img src={feedback} alt="help_center" className="pr-[10px]" />
                  <div>Help Center</div>
                </Link>
                <Link to="/contact" className="flex  hover:bg-light">
                  <img src={contact} alt="contact" className="pr-[10px]" />
                  <div>Contact us</div>
                </Link>
              </li>
              <Link to="/" className="flex mt-auto hover:bg-light">
                Sign Up
              </Link>
            </ul>
          )}
        </div>
        <Title />
      </div>
      <div className="flex flex-row justify-around ">
        {!isLoggedin && (
          <Link to="/signupcontainer">
            <button className="bg-primary text-white rounded-full px-lg h-[30px] mr-[10px]">
              Sign up
            </button>
          </Link>
        )}
        {!isLoggedin && (
          <Link to="/logincontainer">
            <button className=" text-primary outline outline-offset-0  rounded-full px-lg h-[30px] outline-1">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
