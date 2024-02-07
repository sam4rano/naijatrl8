import { Outlet, Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import {
  HiLibrary,
  HiTemplate,
  HiOutlineSwitchHorizontal,
  HiOutlineGlobeAlt,
  HiOutlineUser,
} from "react-icons/hi";

import DashboardAdmin from "./DashboardAdmin";
import AccountAdmin from "./AccountAdmin";
import HistoryAdmin from "./HistoryAdmin";
import ContactAdmin from "./ContactAdmin";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleDashboard = () => {
    setActiveTab("dashboard");
  };
  const handleAccount = () => {
    setActiveTab("account");
  };
  const handleFeedbacks = () => {
    setActiveTab("feedbacks");
  };
  const handleModel = () => {
    setActiveTab("contact");
  };
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between p-[10px]">
        <Link to="/adminlayout" className="text-primary text-lg">
          <span className="font-bold">Naija</span>Translate
        </Link>
        <div className="flex flex-row justify-around">
          <button
            onClick={() => navigate("/")}
            type="submit"
            className="px-[8px] border-[1px] h-[30px] rounded-full text-primary text-center "
          >
            Logout
          </button>
          <div >
            <HiOutlineUser size="25px" color="#319CE9"/>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden">
        <ul className="flex flex-col w-[150px] bg-gray gap-[40px] px-[10px] mr-[10px]">
          <div
            onClick={handleDashboard}
            className={`cursor-pointer flex flex-row m-[10px] w-[120px] ${
              activeTab === "dashboard"
                ? "active text-neutral bg-light rounded-[10px] m-[10px] p-[10px]"
                : "text-gray-dark p-[10px]"
            } `}
          >
            <HiTemplate size="25px" color="#319CE9"/>
            <h5>Dashboard</h5>
          </div>
          <div
            onClick={handleAccount}
            className={`cursor-pointer flex flex-row m-[10px] w-[120px]${
              activeTab === "account"
                ? "active text-neutral bg-light rounded-[10px] m-[10px] p-[10px]"
                : "text-gray-dark p-[10px]"
            } `}
          >
            <HiLibrary size="25px" color="#319CE9" />
            <h5>Account</h5>
          </div>
          <div
            onClick={handleFeedbacks}
            className={`cursor-pointer flex flex-row m-[10px] w-[120px] ${
              activeTab === "feedbacks"
                ? "active text-neutral bg-light rounded-[10px] m-[10px] p-[10px]"
                : "text-gray-dark p-[10px]"
            } `}
          >
            <HiOutlineSwitchHorizontal size="25px" color="#319CE9"/>
            <h5>Feedback</h5>
          </div>
          <div
            onClick={handleModel}
            className={`cursor-pointer flex flex-row m-[10px] ${
              activeTab === "contact"
                ? "active text-neutral bg-light rounded-[10px] m-[10px] p-[10px] "
                : "text-gray-dark p-[10px]"
            } `}
          >
            <HiOutlineGlobeAlt size="25px" color="#319CE9"/>
            <h5>Contact</h5>
          </div>
        </ul>
        <div className="bg-gray w-full">
          {activeTab === "dashboard" && <DashboardAdmin />}
          {activeTab === "account" && <AccountAdmin />}
          {activeTab === "feedbacks" && <HistoryAdmin />}
          {activeTab === "contact" && <ContactAdmin />}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
