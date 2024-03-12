import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import history from "../assets/history.svg";
import feedback from "../assets/feedback.svg";
import contact from "../assets/contact.svg";
import upload from "../assets/upload.svg";
import { HiMenu, HiOutlineX } from "react-icons/hi";

import { useBarStore, useLogin } from "../Stores/Stores";
import { HiOutlineUser } from "react-icons/hi";

const NavVerified = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

  const { isOpen, setOpen } = useBarStore();
  const { isLogOut, setIsLogOut } = useLogin();

  const handleClose = () => {
    setNavbar(false);
  };
  const handleOpen = () => {
    setNavbar(true);
  };

  const handleHistory = () => {
    setOpen(isOpen);
    navigate("/internalhistory");
  };
  const handleLogout = () => {
    navigate("/");
    setIsLogOut(isLogOut);
  };

  return (
    <div className="flex flex-row justify-between p-[10px]">
      <div className="flex flex-row">
        <div
          className=" text-dark focus:border-gray-400 cursor-pointer"
          onClick={() => setNavbar(!navbar)}
        >
          {!navbar && <HiMenu onClick={handleClose} size={30} />}
          {navbar && <HiOutlineX onClick={handleOpen} size={25} />}
          {navbar && (
            <ul className="w-[200px] sm:w-[150px] absolute p-[10px] rounded-[16px] h-full z-30 bg-gray flex flex-col gap-[50px] my-[10px] sm:h-[500px] sm:gap-[10px]">
              <ul>
                <div
                  onClick={handleHistory}
                  className="flex hover:bg-light mb-[20px] p-[10px] rounded-lg sm:align-middle sm:items-center"
                >
                  <img src={history} alt="feedback" className="pr-[10px] sm:h-[25px] sm:w-[25px]" />
                  <div className="sm:text-[12px] sm:leading-[20px]">history</div>
                </div>
                <NavLink
                  to="/developeraccount"
                  className="flex hover:bg-light mb-[20px] p-[10px] rounded-lg sm:align-middle sm:items-center"
                >
                  <img src={feedback} alt="dev account" className="pr-[10px] sm:h-[25px] sm:w-[25px]" />
                  <div className="sm:text-[12px] sm:leading-[20px]"> Developer Account</div>
                </NavLink>
                <NavLink
                  to="/help_centerver"
                  className="flex hover:bg-light mb-[20px] p-[10px] rounded-lg"
                >
                  <img src={upload} alt="help_center" className="pr-[10px] sm:h-[25px] sm:w-[25px] " />
                  <div className="sm:text-[12px] sm:leading-[20px]">Help Center</div>
                </NavLink>
                <NavLink
                  to="/contactver"
                  className="flex hover:bg-light p-[10px] rounded-lg"
                >
                  <img src={contact} alt="contact" className="pr-[10px] sm:h-[25px] sm:w-[25px]" />
                  <div className="sm:text-[12px] sm:leading-[20px]">Contact us</div>
                </NavLink>
              </ul>
              <NavLink to="/" className="flex mt-[150px] hover:bg-light rounded-lg p-[10px] sm:h-[25px] sm:w-[25px]">
                <img src={contact} alt="contact" className="pr-[10px]" />
                <div className="sm:text-[12px] sm:leading-[20px]">Logout</div>
              </NavLink>
            </ul>
          )}
        </div>
        <Link to="/translateveruser" className="text-primary text-lg">
          <span className="font-bold">Naija</span>Translate
        </Link>
      </div>
      <div className="flex flex-row justify-around">
        <button
          onClick={handleLogout}
          type="submit"
          className="px-[8px] border-[1px] h-[30px] rounded-full text-primary text-center "
        >
          Logout
        </button>
        <div className="">
          <HiOutlineUser className="rounded-full h-[30px] w-[30px]  pl-[5px]" />
        </div>
      </div>
    </div>
  );
};

export default NavVerified;
