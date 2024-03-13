import { useState } from "react";
import "./Tabcontainer.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseURL } from "../api/SpeechApi";

const Signup = () => {
  const navigate = useNavigate();

  //individual
  const [activeTab, setActiveTab] = useState("tabone");

  const [individualEmail, setIndividualEmail] = useState("");

  const [individualPassword, setIndividualPassword] = useState("");
  const [individualConfirmPassword, setIndividualConfirmPassword] =
    useState("");
  const [individualFirstName, setIndividualFirstName] = useState("");
  const [individualLastName, setIndividualLastName] = useState("");

  //ORGANISATION
  const [orgName, setOrgName] = useState("");
  const [orgCity, setOrgCity] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgState, setOrgState] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPwd, setOrgPwd] = useState("");
  const [orgConfirmPwd, setOrgConfirmPwd] = useState("");

  const [success, setSuccess] = useState(false);

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

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (passwordPattern.test(individualPassword + individualConfirmPassword)) {
      toast.error(
        "Password must contain at least one letter, one number, and be at least 8 characters long."
      );
      return;
    }

    const isPasswordValid = passwordPattern.test(
      individualPassword + individualConfirmPassword
    );
    console.log("isPasswordValid", isPasswordValid);

    const formData = {
      email: individualEmail,
      first_name: individualFirstName,
      last_name: individualLastName,
      password: individualPassword,
      confirm_password: individualConfirmPassword,
    };

    try {
      const responseUser = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (responseUser.ok) {
        const data = await responseUser.json();
        console.log("data", data);

        setSuccess(true);
        toast.success(data.success);
        toast.success("Check your email for verification link.");
        navigate("/checkinbox");
      } else {
        const data = await responseUser.json();

        toast.error(data.email[0]);
      }
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        toast.error(error.response.data.email[0]);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleUserEmail = (e) => {
    // console.log(e.target.value);

    setIndividualEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setIndividualPassword(e.target.value);
  };
  const handleUserConfirmPassword = (e) => {
    setIndividualConfirmPassword(e.target.value);
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();

    const checkedFormData = {
      name: orgName,
      address: orgAddress,
      city: orgCity,
      state: orgState,
      email: orgEmail,
      password: orgPwd,
      confirm_password: orgConfirmPwd,
    };

    try {
      const response = await fetch(`${baseURL}/organization/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkedFormData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        console.log(data);
        toast.success(data.success);
        navigate("/checkinbox");
      } else {
        const data = await response.json();
        toast.error(data);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-[10px]">
      <div className="w-[360px] flex align-middle items-center flex-col sm:w-full pt-[10px] rounded-md mx-auto">
        <h1 className="font-bold text-[25px] leading-[30px] w-full mx-auto text-center sm:text-[18px] sm:leading-[20px] md:text-[16px] py-[20px]">
          Sign up for your account
        </h1>
        <div className="tab-ul flex flex-col">
          <ul className="flex flex-row list-none text-center cursor-pointer justify-around font-normal text-[13px] pb-[20px] leading-4 w-[327px] mx-auto">
            <li
              onClick={handleTabOne}
              className={`cursor-pointer text-[14px] w-full rounded-full font-medium ${
                activeTab === "tabone"
                  ? "active text-white bg-primary rounded-full"
                  : "text-dark bg-gray"
              } `}
            >
              INDIVIDUAL
            </li>
            <li
              onClick={handleTabTwo}
              className={`cursor-pointer text-[14px] w-full rounded-full font-medium ${
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
                    className="placeholder:p-md appearance-none flex py-[10px] border rounded-[15px] w-full outline-none px-[10px] text-gray-700 leading-tight focus:outline-none "
                    id="individualfirstname"
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="First Name"
                    value={individualFirstName}
                    onChange={(e) => setIndividualFirstName(e.target.value)}
                  />
                </div>
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md outline-none appearance-none flex  py-[10px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none "
                    id="individuallastname"
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Last Name"
                    value={individualLastName}
                    onChange={(e) => setIndividualLastName(e.target.value)}
                  />
                </div>
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md appearance-none outline-none flex  py-[10px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
                    id="individualemail"
                    type="text"
                    required
                    placeholder="Email"
                    value={individualEmail}
                    onChange={handleUserEmail}
                  />
                </div>
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md appearance-none  py-[10px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    value={individualPassword}
                    onChange={handleUserPassword}
                    autoComplete="off"
                  />
                </div>
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md appearance-none  py-[10px] border flex  rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
                    id="individual_confirm_ password"
                    type="password"
                    placeholder="confirm Password"
                    required
                    minLength={8}
                    value={individualConfirmPassword}
                    onChange={handleUserConfirmPassword}
                    autoComplete="off"
                  />
                </div>
                <p className="text-primary text-[12px] leading-3 text-center py-[10px]">
                  Passwords must be at least 8 characters in length, at least
                  one uppercase character, at least one lowercase character, and
                  must contain at least one digit character OR a symbol.
                </p>
                {/* <Link to="#" className="">
                </Link> */}
                <button
                  className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                  type="submit"
                >
                  Sign up
                </button>
                <div className="flex flex-col justify-center mx-auto py-[10px]">
                  <p className=" text-sm">
                    Already have an account?
                    <Link to="/login">
                      <span className="pl-sm pr-sm text-primary">Login</span>
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
                <div className="pb-[10px]">
                  <input
                    className="placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none "
                    id="organisation name"
                    type="text"
                    required
                    placeholder="organisation Name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="pb-[10px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                    id="organisation-address"
                    type="text"
                    required
                    placeholder="organisation address"
                    value={orgAddress}
                    onChange={(e) => setOrgAddress(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="pb-[10px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                    id="organisation_city"
                    type="text"
                    placeholder="Organisation city"
                    required
                    value={orgCity}
                    onChange={(e) => setOrgCity(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="pb-[10px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                    id="organisation state"
                    type="text"
                    placeholder="Organisation state"
                    required
                    value={orgState}
                    onChange={(e) => setOrgState(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="pb-[10px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                    id="organsisation_email"
                    type="text"
                    placeholder="Organisation email"
                    required
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="pb-[10px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                    id="Organisation password"
                    type="password"
                    placeholder="Organisation password"
                    required
                    value={orgPwd}
                    minLength={8}
                    onChange={(e) => setOrgPwd(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="pb-[10px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                    id="org_confirm_pwd"
                    type="password"
                    placeholder="confirm password"
                    required
                    value={orgConfirmPwd}
                    minLength={8}
                    onChange={(e) => setOrgConfirmPwd(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <p className="text-primary text-[12px] leading-3 text-center pb-[10px]">
                  Passwords must be at least 8 characters in length, at least
                  one uppercase character, at least one lowercase character, and
                  must contain at least one digit character OR a symbol.
                </p>
                <button
                  className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                  type="submit"
                >
                  Sign up
                </button>

                <div className="flex flex-col justify-center mx-auto py-[10px]">
                  <p className=" text-sm">
                    Already have an account?
                    <Link to="/logincontainer">
                      <span className="pl-sm pr-sm text-primary">Login</span>
                    </Link>
                  </p>
                  <Link
                    to="/forgotpassword"
                    className="underline underline-offset-4 font-bold mx-auto"
                  >
                    Forgot Password
                  </Link>
                </div>
              </form>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
