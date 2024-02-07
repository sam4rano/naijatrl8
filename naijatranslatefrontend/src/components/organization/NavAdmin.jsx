import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import history from "../../assets/history.svg";

import feedback from "../../assets/feedback.svg";
import contact from "../../assets/contact.svg";
import upload from "../../assets/upload.svg";
import close from "../../assets/open.svg";
import open from "../../assets/close.svg";

import { HiOutlineUser } from "react-icons/hi";

const NavAdmin = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();



  const handleClose = () => {
    setNavbar(false);
  };
  const handleOpen = () => {
    setNavbar(true);
  };


  return (
    <div className="flex flex-row justify-between p-[10px]">
      <div className="flex flex-row">
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
              className="w-[30px] h-[30px]"
            />
          )}
          {navbar && (
            <ul className="w-[200px] absolute p-[10px] rounded-[16px] h-full z-30 bg-gray flex flex-col gap-lg">
              <ul>
                <button
                  
                  className="flex hover:bg-light mb-[20px]"
                >
                  <img src={history} alt="feedback" className="pr-[10px]" />
                  <div>history</div>
                </button>
                <NavLink
                  to="/feedback"
                  className="flex hover:bg-light mb-[20px]"
                >
                  <img src={feedback} alt="feedback" className="pr-[10px]" />
                  <div>feedback</div>
                </NavLink>
                <NavLink
                  to="/help_center"
                  className="flex hover:bg-light mb-[20px]"
                >
                  <img src={upload} alt="help_center" className="pr-[10px]" />
                  <div>Help Center</div>
                </NavLink>
                <NavLink to="/contact" className="flex hover:bg-light">
                  <img src={contact} alt="contact" className="pr-[10px]" />
                  <div>Contact us</div>
                </NavLink>
              </ul>
              <NavLink to="/" className="flex mt-auto hover:bg-light">
                <img src={contact} alt="contact" className="pr-[10px]" />
                <div>Logout</div>
              </NavLink>
            </ul>
          )}
        </div>
        <div>
          <Link to="/" className="text-primary text-lg">
            <span className="font-bold">Naija</span>Translate
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-around">
        <button
          onClick={() => navigate("/")}
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

export default NavAdmin;
