import { Link, useNavigate } from "react-router-dom";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/SpeechApi";

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState("tabone");
  const [individualEmail, setIndividualEmail] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabOne = () => {
    setActiveTab("tabone");
  };
  const handleTabTwo = () => {
    setActiveTab("tabtwo");
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      email: individualEmail,
    };

    try {
      const response = await fetch(`${baseURL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setIsLoading(false);
        setTimeout(() => {
          navigate("/logincontainer");
        }, 2000);
      } else {
        const data = await response.json();
        console.log("data", data);
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
      const response = await fetch(`${baseURL}/organization/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsLoading(false);
        const responseData = await response.json();
        toast.success(responseData.message);
        setTimeout(() => {
          navigate("/logincontainer");
        }, 2000);
      } else {
        // console.log("Registration failed");
        const data = await response.json();

        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
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
          <h3 className="text-center py-[10px] text-[12px]">
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
            INDIVIDUAL
          </li>
          <li
            onClick={handleTabTwo}
            className={`cursor-pointer rounded-full font-[600] ${
              activeTab === "tabtwo"
                ? "active text-white bg-primary rounded-full"
                : "text-dark bg-gray "
            } `}
          >
            ORGANISATION
          </li>
        </ul>
        {activeTab === "tabone" ? (
          <form
            onSubmit={handleSubmitUser}
            className="rounded-md flex flex-col content-center max-w-[340px] mx-auto"
          >
            <div className="pb-sm">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-[327px] p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="email"
                type="text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setIndividualEmail(e.target.value);
                }}
              />
            </div>
            {/* <button className="bg-primary text-white rounded-full w-[327px] px-lg h-[40px]">
              Send Instructions
            </button> */}
            <button
              className="bg-primary hover:cursor-pointer text-white rounded-full w-full px-lg h-[40px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please wait .." : "Send Instructions"}
            </button>

            <Link to="/logincontainer" className="mx-auto font-[700]">
              <h2>Back to Login Page</h2>
            </Link>
          </form>
        ) : (
          <form
            onClick={handleSubmitAdmin}
            className="rounded-md flex flex-col content-center max-w-[340px] mx-auto"
          >
            <div className="pb-sm">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-[327px] p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="email"
                type="text"
                placeholder="Organisation Email"
                required
                onChange={(e) => {
                  setOrganisationEmail(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="px-[8px] border-[1px] h-[30px] w-[120px] bg-blue-100 mx-auto rounded-full text-primary text-center"
              disabled={isLoading}
            >
              {isLoading ? "Please wait" : "Send Instructions"}
            </button>
            <Link to="/logincontainer" className="mx-auto font-[700] ">
              <h2 className="hover:underline-offset-4">Back to Login Page</h2>
            </Link>
          </form>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
