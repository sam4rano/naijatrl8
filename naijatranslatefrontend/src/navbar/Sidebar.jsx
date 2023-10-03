import { useState } from "react";

//assets
// import feedback from "../assets/feedback.svg";
// import helpcenter from "../assets/upload.svg"
// import history from "../assets/history.svg"
// import contact from "../assets/contact.svg"

// components
import Feedback from "../pages/Feedback"
import History from "../pages/History"
import Contact from "../pages/Contact"
import HelpCenter from "../pages/HelpCenter"




const Sidebar = () => {
  // const [activeTab, setActiveTab] = useState("history");

  // const handleHistory = () => {
  //   setActiveTab("history");
  // };
  // const handleFeedback = () => {
  //   setActiveTab("feedback");
  // };
  // const handleContact = () => {
  //   setActiveTab("contact");
  // };
  
  // const handleHelpCenter = () => {
  //   setActiveTab("help_center");
  // };
  return (
	<>
    <div className="flex pt-[10px]">
      {/* <ul className="flex flex-col gap-[40px] p-[10px] bg-gray mr-[10px]">
        <li
          onClick={handleHistory}
          className={`cursor-pointer ${
            activeTab === "history"
              ? "active text-neutral px-[10px] py-[5px] flex bg-light rounded-[20px]"
              : "text-gray-dark flex justify-around flex-row pr-[10px]"
          } `}
        >
          <img src={history} alt="history" className="pr-[10px]" />
          <div>History</div>
        </li>
        <li
          onClick={handleFeedback}
          className={`cursor-pointer ${
            activeTab === "feedback"
              ? "active flex px-[10px] py-[5px] text-neutral bg-light rounded-[20px]"
              : "text-gray-dark flex"
          } `}
        >
          <img src={feedback} alt="feedback" className="pr-[10px]" />
          <div>Feedback</div>
        </li>
        <li
          onClick={handleHelpCenter}
          className={`cursor-pointer ${
            activeTab === "help_center"
              ? "active flex px-[5px] py-[5px] text-neutral bg-light rounded-[20px]"
              : "text-gray-dark flex"
          } `}
        >
          <img src={helpcenter} alt="helpcenter" className="pr-[10px]" />
          <div>Help center</div>
        </li>
        <li
          onClick={handleContact}
          className={`cursor-pointer ${
            activeTab === "contact"
              ? "active flex px-[10px] py-[5px] text-neutral bg-light rounded-[20px]"
              : "text-gray-dark flex"
          } `}
        >
          <img src={contact} alt="contact" className="pr-[10px]" />
          <div>Contact Us</div>
        </li>
      </ul> */}
      <History />
      <Feedback />
      <HelpCenter />
      <Contact />

      {/* <div className="bg-gray flex-auto">
        {activeTab === "dashboard" && <History />}
        {activeTab === "account" && <Feedback />}
        {activeTab === "feedbacks" && <HelpCenter />}
        {activeTab === "model" && <Contact />}
      </div> */}
    </div>
	
	</>
  );
};

export default Sidebar;
