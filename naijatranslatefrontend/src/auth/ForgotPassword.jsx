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
      } finally {
        setIsLoading(false);
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
          const data = await response.json();
          toast.error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [organisationEmail, navigate]
  );

  return (
    <div className="flex flex-col py-[20px]">
      <div className="w-[360px] flex flex-col align-middle items-center justify-center sm:w-full mx-auto pt-[10px] sm:gap-[10px] gap-[20px]">
        <div className="">
          <h1 className="text-center text-[20px] leading-[30px] font-bold">
            Reset your password{" "}
          </h1>
          <h3 className="text-center py-[10px] text-[14px] leading-[20px] w-[360px] px-[10px]">
            Enter your email, and we’ll send you instructions on how to reset
            your password.
          </h3>
        </div>
        <ul className="tab-ul flex flex-row list-none text-center cursor-pointer justify-around font-normal text-[13px] pb-[10px] leading-4 w-full max-w-[360px] mx-auto">
          <li
            onClick={handleTabOne}
            className={`cursor-pointer rounded-full font-[600] w-full ${
              activeTab === "tabone"
                ? "active text-white bg-primary rounded-full"
                : "text-dark bg-gray"
            } `}
          >
            INDIVIDUAL
          </li>
          <li
            onClick={handleTabTwo}
            className={`cursor-pointer rounded-full font-[600] w-full ${
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
            className="rounded-[10px] flex flex-col align-middle items-center w-full max-w-[360px] mx-auto"
          >
            <div className="pb-sm">
              <input
                className="shadow placeholder:p-md appearance-none flex border rounded-[15px] w-full sm:w-[350px] mdx:w-[350px] mx-auto text-gray-700 py-[10px]  px-[1px] leading-tight focus:outline-none focus:shadow-outline "
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
              <h2 className="underline underline-offset-2">
                Back to Login Page
              </h2>
            </Link>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitAdmin}
            className="rounded-md flex flex-col align-middle items-center w-full max-w-[360px] mx-auto"
          >
            <div className="pb-sm">
              <input
                className="shadow placeholder:p-md appearance-none flex border rounded-[15px] w-full sm:w-[35
                  0px] mdx:w-[350px] mx-auto text-gray-700 py-[10px]  px-[1px] leading-tight focus:outline-none focus:shadow-outline "
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
              <h2 className="underline underline-offset-2">
                Back to Login Page
              </h2>
            </Link>
          </form>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
