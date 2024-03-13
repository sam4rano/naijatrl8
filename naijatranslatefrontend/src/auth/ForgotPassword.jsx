import { Link, useNavigate } from "react-router-dom";

import "./Tabcontainer.css";
import { useCallback, useState } from "react";
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

  const handleSubmitUser = useCallback(
    async (e) => {
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
            navigate("/login");
          }, 2000);
        } else {
          const data = await response.json();
          
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [individualEmail, navigate]
  );

  const handleSubmitAdmin = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const formData = {
        email: organisationEmail,
      };

      try {
        const response = await fetch(
          `${baseURL}/organization/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          toast.success(responseData.message);
          setIsLoading(false);
          setTimeout(() => {
            navigate("/login");
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
    },
    [organisationEmail, navigate]
  );

  return (
    <div className="flex flex-col py-[20px]">
      <div className="w-[360px] sm:w-full mx-auto pt-[10px] sm:gap-[30px]">
        <div className="flex justify-center align-middle items-center flex-col w-[360px] sm:gap-[10px]">
          <h1 className="text-center text-[20px] leading-[30px] font-bold">
            Reset your password{" "}
          </h1>
          <h3 className="text-center py-[10px] text-[14px] leading-[20px] w-[300px] ">
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
            className="rounded-[10px] flex flex-col align-middle items-center max-w-[360px] mx-auto"
          >
            <div className="pb-sm">
              <input
                className="shadow placeholder:p-md appearance-none flex border rounded-[15px] w-[360px] text-gray-700 py-[10px]  px-[5px] leading-tight focus:outline-none focus:shadow-outline "
                id="email"
                type="text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setIndividualEmail(e.target.value);
                }}
              />
            </div>
            <button
              className="bg-primary hover:cursor-pointer text-white rounded-full w-full px-[10px] py-[10px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please wait .." : "Send Instructions"}
            </button>

            <Link to="/login" className="mx-auto font-[700]">
              <h2 className="underline underline-offset-2">Back to Login Page</h2>
            </Link>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitAdmin}
            className="rounded-md flex flex-col align-middle items-center max-w-[360px] mx-auto"
          >
            <div className="pb-sm">
              <input
                className="shadow placeholder:p-[10px] px-[5px] appearance-none flex border rounded-[15px] w-[360px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-[10px]"
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
              className="bg-primary hover:cursor-pointer text-white rounded-full w-full px-[10px] py-[10px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please wait .." : "Send Instructions"}
            </button>

            <Link to="/login" className="mx-auto font-[700]">
              <h2 className="underline underline-offset-2">Back to Login Page</h2>
            </Link>
          </form>
        )}
        
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
