import { Link, useNavigate } from "react-router-dom";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/SpeechApi";

const ResendVerification = () => {
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
      const response = await fetch(`${baseURL}/resend/verify-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setIsLoading(false);

        toast.success(responseData.message + ",check your email");
        setTimeout(() => {
          navigate("/checkinbox");
        }, 2000);
      } else {
        const data = await response.json();

        toast.error(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      email: organisationEmail,
    };

    try {
      const response = await fetch(
        `${baseURL}/organization/resend/verify-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsLoading(false);
        const responseData = await response.json();
        toast.success(responseData.message + ",check your email");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const data = await response.json();
        toast.error(data.error);
        setTimeout(() => {
          navigate("/checkinbox");
        }, 2000);
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
            onSubmit={handleSubmitUser}
            className="rounded-md flex flex-col content-center max-w-[340px] mx-auto p-md"
          >
            <div className="pb-md">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="email"
                type="text"
                placeholder="Individual Email"
                required
                onChange={(e) => {
                  setIndividualEmail(e.target.value);
                }}
              />
            </div>
            <button
              className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Send Instructions"}
            </button>

            <Link to="/login" className="mx-auto font-[700]">
              <h2>Back to Login Page</h2>
            </Link>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitAdmin}
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

            <button
              className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Send Instructions"}
            </button>
            <Link to="/login" className="mx-auto font-[700]">
              <h2>Back to Login Page</h2>
            </Link>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResendVerification;
