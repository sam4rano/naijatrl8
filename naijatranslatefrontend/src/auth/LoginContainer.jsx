import { useState } from "react";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginContainer = () => {
  const [activeTab, setActiveTab] = useState("tabone");

  const [individualEmail, setIndividualEmail] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");

  const [individualPassword, setIndividualPassword] = useState("");
  const [organisationPassword, setOrganisationPassword] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
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

    if (!individualEmail || !individualPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    const formData = {
      email: individualEmail,
      password: individualPassword,
    };

    try {
      const response = await fetch("http://3.83.243.144/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(formData),
      });
      // console.log("response data", response);

      if (response.ok) {
        toast.success("Registration successful");
        const data = await response.json();
        const accessToken = data.access;
        const refreshToken = data.refresh;

        console.log("token", refreshToken);
        console.log("Registration successful");
        setRegistrationSuccess(true);
        // Save the access token in an HttpOnly cookie
        document.cookie = `access_token=${accessToken}; Secure; SameSite=None`;

        navigate("/translateveruser");
      } else {
        console.log("Registration failed");
        const data = await response.json();

        toast.error(data.detail);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      toast.error("Network error, please check your network", error);
    } finally {
      setIsLoading(false);
    }
  };

  //admin login
  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!organisationEmail || !organisationPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = {
      email: organisationEmail,
      password: organisationPassword,
    };

    try {
      const response = await fetch(
        "http://3.83.243.144/api/v1/organization/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          body: JSON.stringify(formData),
        }
      );

      console.log("org", response);
      if (response.ok) {
        toast.success("Registration successful");
        const data = await response.json();
        const accessToken = data.access;
        const refreshToken = data.refresh;

        console.log("token", refreshToken);
        console.log("Registration successful");
        setRegistrationSuccess(true);
       
        document.cookie = `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict`;
        navigate("/translateveruser");
        toast.success("Registration successful");
      } else {
        console.log("Registration failed");
        const data = await response.json();

        toast.error(data.error);
      }
  
    } catch (error) {
      console.log("An error occurred:", error);
      toast.error("An error occurred", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-[10px]">
      <Title />
      <div className="w-[340px] mx-auto pt-[50px]">
        <h1 className="font-[700] justify-center align-middle text-[18px] leading-4 flex w-full h-[33px] mx-auto text-center">
          Login to your account account
        </h1>
        <div className="tab-ul flex flex-col">
          <ul className="flex flex-row list-none text-center cursor-pointer justify-around font-[400] text-[13px] pb-[20px] leading-4 w-[327px] mx-auto">
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
          <div>
            {activeTab === "tabone" ? (
              <form
                onSubmit={handleSubmitUser}
                className="rounded-md flex flex-col content-center max-w-[448px] mx-auto"
              >
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md appearance-none px-[10px] outline-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
                    id="individualemail"
                    type="text"
                    placeholder="Email"
                    required
                    value={individualEmail}
                    onChange={(e) => setIndividualEmail(e.target.value)}
                  />
                </div>
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md appearance-none px-[10px]  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none"
                    id="individual_password"
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    value={individualPassword}
                    onChange={(e) => setIndividualPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button
                  className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait" : "Log in"}
                </button>
                {/* <Link to="#" className="pb-[20px]">
                </Link> */}
                <div className="flex flex-col justify-center mx-auto py-[10px]">
                  <p className=" text-sm">
                    Sign up for an account?
                    <Link to="/signupcontainer">
                      <span className="pl-sm pr-sm text-primary">Sign Up</span>
                    </Link>
                  </p>
                  <Link
                    to="/passwordresetinvoke"
                    className="underline underline-offset-8 mx-auto"
                  >
                    Forgot Password
                  </Link>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleSubmitAdmin}
                className="rounded-md flex flex-col content-center max-w-[448px] mx-auto"
              >
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md px-[10px] appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 leading-tight focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Organisation Email"
                    required
                    value={organisationEmail}
                    onChange={(e) => setOrganisationEmail(e.target.value)}
                  />
                </div>
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md appearance-none px-[10px]  h-[40px] border flex  rounded-[15px] w-full text-gray-700 leading-tight focus:outline-none"
                    id="organisation_password"
                    type="password"
                    placeholder="Admin Password"
                    required
                    minLength={8}
                    value={organisationPassword}
                    onChange={(e) => setOrganisationPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button
                  className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                  type="submit"
                   disabled={isLoading}
                >
                {isLoading ? "Please wait" : "Log in"}
                </button>

                <div className="flex flex-col justify-center mx-auto py-[10px]">
                  <p className=" text-sm">
                    Sign up for an account?
                    <Link to="/signupcontainer">
                      <span className="pl-sm pr-sm text-primary">Sign Up</span>
                    </Link>
                  </p>
                  <Link
                    to="/passwordresetinvoke"
                    className="underline underline-offset-8 mx-auto"
                  >
                    Forgot Password
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginContainer;
