import { Link, useNavigate } from "react-router-dom";
import Title from "../utils/Title";
import { useState } from "react";
import "./Tabcontainer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordChange = () => {
  const [individualEmail, setIndividualEmail] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");
  const [activeTab, setActiveTab] = useState("tabone");

  const navigate = useNavigate();

  const handleTabOne = () => {
    setActiveTab("tabone");
  };
  const handleTabTwo = () => {
    setActiveTab("tabtwo");
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    const formData = {
      email: individualEmail,
    };

    try {
      const response = await fetch(
        "http://3.83.243.144//api/v1/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Password changed successful");
        toast.success("password successfully changed");
        navigate("/logincontainer");
      } else {
        console.log("password change failed");
        const data = await response.json();

        toast.error(data.detail);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      toast.error("An error occurred");
    }
  };
  const handleSubmitAdmin = async (e) => {
    e.preventDefault();

    const formData = {
      email: individualEmail,
    };

    try {
      const response = await fetch(
        "http://3.83.243.144/api/v1/organization/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Password changed successful");
        toast.success("password successfully changed");
        navigate("/logincontainer");

      } else {
        console.log("password change failed");
        const data = await response.json();

        toast.error(data.detail);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="p-[20px]">
      <Title />
      <form className="rounded-md flex flex-col content-center w-[320px] mx-auto pt-[50px]">
        <h1 className="font-[600] text-center py-[15px] text-[18px]">
          Change your Password
        </h1>
        <ul className="tab-ul flex flex-row list-none text-center cursor-pointer justify-around font-[400] text-[13px] pb-[20px] leading-4 w-[327px] mx-auto">
          <li
            onClick={handleTabOne}
            className={`cursor-pointer rounded-full font-[600] ${
              activeTab === "tabone"
                ? "active text-white bg-primary rounded-full"
                : "text-dark bg-gray"
            } `}
          >
            Individual
          </li>
          <li
            onClick={handleTabTwo}
            className={`cursor-pointer rounded-full font-[600] ${
              activeTab === "tabtwo"
                ? "active text-white bg-primary rounded-full"
                : "text-dark bg-gray "
            } `}
          >
            Organisation
          </li>
        </ul>
        {activeTab === "tabone" ? (
          <form onClick={handleSubmitUser} className="">
            <div className="pb-sm">
              <input
                className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none "
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setIndividualEmail(e.target.value)}
              />
            </div>
            <div className="pb-sm">
              <input
                className="placeholder:p-md outline-none appearance-none  h-[40px] border flex  rounded-[15px] w-full px-[10px] text-gray-700 mb-3 leading-tight focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="pb-sm">
              <input
                className="placeholder:p-md outline-none appearance-none  h-[40px] border flex  rounded-[15px] w-full px-[10px] text-gray-700 mb-3 leading-tight focus:outline-none"
                id="confirm_password"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <Link to="/logincontainer" className="">
              <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
                Next
              </button>
            </Link>
          </form>
        ) : (
          <form onClick={handleSubmitAdmin} className="">
            <div className="pb-sm">
              <input
                className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
                id="email"
                type="email"
                placeholder="Organisation Email"
              />
            </div>
            <div className="pb-sm">
              <input
                className="placeholder:p-md outline-none appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="pb-sm">
              <input
                className="placeholder:p-md outline-none appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                id="confirm_password"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <Link to="/logincontainer" className="pb-sm">
              <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
                Next
              </button>
            </Link>
          </form>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default PasswordChange;
