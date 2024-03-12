import { useCallback, useState } from "react";

import "./Tabcontainer.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api/SpeechApi";

const LoginContainer = () => {
  const [activeTab, setActiveTab] = useState("tabone");
  const [individualEmail, setIndividualEmail] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");
  const [individualPassword, setIndividualPassword] = useState("");
  const [organisationPassword, setOrganisationPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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

      if (!individualEmail || !individualPassword) {
        toast.error("Please fill in all fields.");
        return;
      }
      const formData = {
        email: individualEmail,
        password: individualPassword,
      };

      try {
        const response = await fetch(`${baseURL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsLoading(false);
          toast.success("Registration successful");
          const data = await response.json();

          const accessToken = data.access;
          const isOrg = data.is_organization;

          // Save the access token in an HttpOnly cookie
          document.cookie = `access_token=${accessToken}; Secure; SameSite=None`;

          if (isOrg) {
            localStorage.setItem("isOrg", JSON.stringify(true));
            setTimeout(() => {
              navigate("/adminlayout"), 2000;
            });
          } else {
            setTimeout(() => {
              navigate("/translateveruser"), 2000;
            });
          }
        } else {
          const data = await response.json();
          toast.error(data.detail);
        }
      } catch (error) {
        toast.error("Network error, please check your network", error);
      } finally {
        setIsLoading(false);
      }
    },
    [individualEmail, individualPassword, navigate]
  );

  //admin login
  const handleSubmitAdmin = useCallback(
    async (e) => {
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
        const response = await fetch(`${baseURL}/organization/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsLoading(false);
          setIsAdmin(!isAdmin);
          toast.success("Registration successful");
          const data = await response.json();
          const accessToken = data.access;

          localStorage.setItem("isAdmin", JSON.stringify(true));

          document.cookie = `access_token=${accessToken}; Secure; SameSite=None`;
          navigate("/adminlayout");
        } else {
          const data = await response.json();
          toast.error(data.detail);
        }
      } catch (error) {
        toast.error("An error occurred", error);
      } finally {
        setIsLoading(false);
      }
    },
    [organisationEmail, organisationPassword, isAdmin, navigate]
  );

  return (
    <div className="p-[10px]">
      <div className="w-[360px] sm:w-full pt-[20px] mx-auto">
        <h1 className="font-bold text-[30px] leading-[40px] sm:text-[20px] sm:leading-[30px] text-center py-[20px]">
          Login to your account
        </h1>
        <div className="tab-ul flex flex-col ">
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
                    <Link to="/signup">
                      <span className="pl-sm pr-sm text-primary">Sign Up</span>
                    </Link>
                  </p>
                  <Link
                    to="/forgotpassword"
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
                    <Link to="/signup">
                      <span className="pl-sm pr-sm text-primary">Sign Up</span>
                    </Link>
                  </p>
                  <Link
                    to="/forgotpassword"
                    className="underline underline-offset-8 mx-auto"
                  >
                    Forgot Password
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginContainer;
