import { Outlet, Link } from "react-router-dom";

import { useState } from "react";

import { HiTemplate, HiOutlineSwitchHorizontal } from "react-icons/hi";

import HelpCenter from "../pages/HelpCenter";
import Contact from "../pages/Contact";
import TranslateForm from "./TranslateForm";

const UnverifiedLayout = () => {
  const [activeTab, setActiveTab] = useState("translateform");

  const handleForm = () => {
    setActiveTab("translateform");
  };

  const handleHelpCenter = () => {
    setActiveTab("helpcenter");
  };

  const handleContact = () => {
    setActiveTab("contact");
  };
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between p-[10px]">
        <Link to="/" className="text-primary text-lg">
          <span className="font-bold">Naija</span>Translate
        </Link>
      </div>
      <div className="flex overflow-hidden">
        <ul className="flex flex-col w-[150px] bg-gray gap-[40px] px-[10px] mr-[10px]">
          <div
            onClick={handleForm}
            className={`cursor-pointer flex flex-row m-[10px] w-[120px] ${
              activeTab === "translateform"
                ? "active text-neutral bg-light rounded-[10px] m-[10px] p-[10px]"
                : "text-gray-dark p-[10px]"
            } `}
          >
            <HiTemplate size="25px" color="#319CE9" />
            <h5>Translation</h5>
          </div>
          <div
            onClick={handleHelpCenter}
            className={`cursor-pointer flex flex-row m-[10px] w-[120px] ${
              activeTab === "helpcenter"
                ? "active text-neutral bg-light rounded-[10px] m-[10px] p-[10px]"
                : "text-gray-dark p-[10px]"
            } `}
          >
            <HiTemplate size="25px" color="#319CE9" />
            <h5>Help Center</h5>
          </div>
          <div
            onClick={handleContact}
            className={`cursor-pointer flex flex-row m-[10px] w-[120px]${
              activeTab === "contact"
                ? "active text-neutral bg-light rounded-[10px] m-[10px] p-[10px]"
                : "text-gray-dark p-[10px]"
            } `}
          >
            <HiOutlineSwitchHorizontal size="25px" color="#319CE9" />
            <h5>Contact</h5>
          </div>
        </ul>
        <div className="bg-gray w-full">
          {activeTab === "translateform" && <TranslateForm />}
          {activeTab === "helpcenter" && <HelpCenter />}

          {activeTab === "contact" && <Contact />}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default UnverifiedLayout;
