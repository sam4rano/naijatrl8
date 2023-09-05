import { useState } from "react";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginContainer = () => {
  const [activeTab, setActiveTab] = useState("tabone");

  const [individualEmail, setIndividualEmail] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");

  const [individualPassword, setIndividualPassword] = useState("");
  const [organisationPassword, setOrganisationPassword] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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

      password: individualPassword,
    };

    try {
      const response = await fetch("http://3.83.243.144/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registration successful");
        setRegistrationSuccess(true);
        toast.success("Registration successful");
      } else {
        console.log("Registration failed");
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
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Registration successful");
        setRegistrationSuccess(true);
        toast.success("Registration successful");
      } else {
        console.log("Registration failed");
        const data = await response.json();
        console.log(data);
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log("An error occurred:", error);
      toast.error("An error occurred");
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
          <div>
            {activeTab === "tabone" ? (
              <form
                onClick={handleSubmitUser}
                className="rounded-md flex flex-col content-center max-w-[448px] mx-auto p-[10px]"
              >
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
                    id="individualemail"
                    type="text"
                    placeholder="Email"
                    required
                    value={individualEmail}
                    onChange={(e) => setIndividualEmail(e.target.value)}
                  />
                </div>
                <div className="pb-[20px]">
                  <input
                    className="placeholder:p-md outline-none appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="individualpassword"
                    type="individualpassword"
                    placeholder="Password"
                    required
                    value={individualPassword}
                    onChange={(e) => setIndividualPassword(e.target.value)}
                  />
                </div>
                <Link to="#" className="pb-[20px]">
                  <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
                    Log in
                  </button>
                </Link>
                <div className="flex flex-col justify-center mx-auto">
                  <p className=" text-sm">
                    Sign up for an account?
                    <Link to="/signupcontainer">
                      <span className="pl-sm pr-sm text-primary">Sign Up</span>
                    </Link>
                  </p>
                  <Link
                    to="/passwordreset"
                    className="underline underline-offset-8 mx-auto"
                  >
                    Forgot Password
                  </Link>
                </div>
              </form>
            ) : (
              <form
                onClick={handleSubmitAdmin}
                className="rounded-md flex flex-col content-center max-w-[448px] mx-auto p-[10px]"
              >
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Organisation Email"
                    required
                    value={organisationEmail}
                    onChange={(e) => setOrganisationEmail(e.target.value)}
                  />
                </div>
                <div className="pb-[20px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="organisation_password"
                    type="password"
                    required
                    placeholder="Password"
                    value={organisationPassword}
                    onChange={(e) => setOrganisationPassword(e.target.value)}
                  />
                </div>
                <Link to="#" className="pb-[20px]">
                  <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
                    Log in
                  </button>
                </Link>
                <div className="flex flex-col justify-center mx-auto">
                  <p className=" text-sm">
                    Sign up for an account?
                    <Link to="/signupcontainer">
                      <span className="pl-sm pr-sm text-primary">Sign Up</span>
                    </Link>
                  </p>
                  <Link
                    to="/passwordreset"
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