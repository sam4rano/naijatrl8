import { Link, useNavigate } from "react-router-dom";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordResetInvoke = () => {
  const [activeTab, setActiveTab] = useState("tabone");
  const [individualEmail, setIndividualEmail] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

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
        "http://3.83.243.144/api/v1/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Registration successful");
        navigate("/logincontainer");

        toast.success("Registration successful");
      } else {
        const data = await response.json();
      

        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmitAdmin = async (e) => {
    e.preventDefault();

    const formData = {
      email: organisationEmail,
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
        console.log("Registration successful");
        navigate("/logincontainer");

        toast.success("Registration successful");
      } else {
        // console.log("Registration failed");
        const data = await response.json();
        console.log("data",data);
     

        toast.error(data.error);
      }
    } catch (error) {
      
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col p-[20px]">
      <Title />
      <div className="w-[320px] mx-auto pt-[40px]">
        <div className="flex justify-center align-middle flex-col w-[320px]">
          <h1 className="text-center py-[20px] text-[14px] font-[600]">
            Reset your password{" "}
          </h1>
          <h3 className="text-center py-[5px] text-[12px]">
            Enter your email, and we’ll send you instructions on how to reset
            your password.
          </h3>
        </div>
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
          <form
            onClick={handleSubmitUser}
            className="rounded-md flex flex-col content-center max-w-[340px] mx-auto p-md"
          >
            <div className="pb-md">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="email"
                type="text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setIndividualEmail(e.target.value);
                }}
              />
            </div>
            <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
              Send Instructions
            </button>

            <Link to="/logincontainer" className="mx-auto font-[700]">
              <h2>Back to Login Page</h2>
            </Link>
          </form>
        ) : (
          <form
            onClick={handleSubmitAdmin}
            className="rounded-md flex flex-col content-center max-w-[340px] mx-auto p-md"
          >
            <div className="pb-md">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="email"
                type="text"
                placeholder="Organisation Email"
                required
                onChange={(e) => {
                  setOrganisationEmail(e.target.value);
                }}
              />
            </div>
            <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
              Send Instructions
            </button>
            <Link to="/logincontainer" className="mx-auto font-[700]">
              <h2>Back to Login Page</h2>
            </Link>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordResetInvoke;
