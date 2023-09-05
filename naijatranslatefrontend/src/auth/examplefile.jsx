import { useState, useEffect, useRef } from "react";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import Checkbox from "../utils/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignupContainer = () => {
  const errRef = useRef();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tabone");

  const [individualEmail, setIndividualEmail] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");

  const [individualPassword, setIndividualPassword] = useState("");
  const [organisationPassword, setOrganisationPassword] = useState("");

  const [individualFirstName, setIndividualFirstName] = useState("");
  const [organisationFirstName, setOrganisationFirstName] = useState("");

  const [individualLastName, setIndividualLastName] = useState("");
  const [organisationLastName, setOrganisationLastName] = useState("");

  const [individualConfirmPassword, setIndividualConfirmPassword] =
    useState("");
  const [organisationConfirmPassword, setOrganisationConfirmPassword] =
    useState("");

  const [success, setSuccess] = useState(false);

  
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleTabOne = () => {
    setActiveTab("tabone");
  };
  const handleTabTwo = () => {
    setActiveTab("tabtwo");
  };

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(individualPassword || organisationPassword));
  setValidMatch(individualPassword === matchPwd || organisationPassword === matchPwd);
  }, [matchPwd, individualPassword, organisationPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [organisationPassword, individualPassword, matchPwd]);

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    const v1 = PWD_REGEX.test(individualPassword);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }

    const formData = {
      email: individualEmail,
      first_name: individualFirstName,
      last_name: individualLastName,
      password: individualPassword,
      confirm_password: individualConfirmPassword,
    };

    try {
      const responseUser = await fetch("http://3.83.243.144/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
        withCredentials: true,
      });
      // console.log("signup response", responseUser);

      if (responseUser.ok) {
        const data = await responseUser.json();

        setSuccess(true);
        setIndividualPassword(" ");
        setIndividualConfirmPassword(" ");
        toast.success(data.success);
        navigate("/checkinbox");
      } else {
        const data = await responseUser.json();

        toast.error(data.email[0]);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();

    const v2 = PWD_REGEX.test(organisationPassword);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    const formData = {
      email: organisationEmail,
      first_name: organisationFirstName,
      last_name: organisationLastName,
      password: organisationPassword,
      confirm_password: organisationConfirmPassword,
    };

    try {
      const response = await fetch(
        "http://3.83.243.144/api/v1/organization/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          withCredentials: true,
        }
      );

      if (response.ok) {
        toast.success("Registration successful");
        setSuccess(true);
        setOrganisationPassword("");
        setOrganisationConfirmPassword("");
        navigate("/checkinbox");
      } else {
        const data = await response.json();
        toast.error(data.email[0]);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="p-[10px]">
      <Title />
      <div className="w-[340px] mx-auto pt-[30px]">
        <h1 className="font-[700] justify-center align-middle text-[18px] leading-4 flex w-full h-[33px] mx-auto text-center">
          Sign up for your account account
        </h1>
        <div className="tab-ul flex flex-col">
          <ul className="flex flex-row list-none text-center cursor-pointer justify-around font-[400] text-[13px] pb-[20px] leading-4 w-[327px] mx-auto">
            <li
              onClick={handleTabOne}
              className={`cursor-pointer text-[14px] rounded-full font-[600] ${
                activeTab === "tabone"
                  ? "active text-white bg-primary rounded-full"
                  : "text-dark bg-gray"
              } `}
            >
              Individual
            </li>
            <li
              onClick={handleTabTwo}
              className={`cursor-pointer text-[14px]  rounded-full font-[600] ${
                activeTab === "tabtwo"
                  ? "active text-white bg-primary rounded-full"
                  : "text-dark bg-gray "
              } `}
            >
              Organisation
            </li>
          </ul>
          {/* <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p> */}
          <div>
            {activeTab === "tabone" ? (
              <form
                onClick={handleSubmitUser}
                className="rounded-md flex flex-col content-center max-w-[448px] mx-auto p-[10px]"
              >
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full outline-none p-[1rem] text-gray-700 leading-tight focus:outline-none "
                    id="individualfirstname"
                    type="text"
                    required
                    placeholder="First Name"
                    value={individualFirstName}
                    onChange={(e) => setIndividualFirstName(e.target.value)}
                  />
                </div>
                <div className="pb-md">
                  <input
                    className="placeholder:p-md outline-none appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
                    id="individuallastname"
                    required
                    type="text"
                    placeholder="Last Name"
                    value={individualLastName}
                    onChange={(e) => setIndividualLastName(e.target.value)}
                  />
                </div>
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
                    id="individualemail"
                    type="text"
                    required
                    placeholder="Email"
                    value={individualEmail}
                    onChange={(e) => setIndividualEmail(e.target.value)}
                  />
                </div>
                <div className="pb-md">
                  <FaCheck className={validPwd ? "text-primary ml-[10px]" : "hidden"} />
                  <FaTimes
                    className={
                      validPwd || !individualPassword ? "hidden" : "text-secondary ml-[10px]"
                    }
                  />
                  <input
                    className="placeholder:p-md outline-none appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="individualpassword"
                    type="individualpassword"
                    placeholder="Password"
                    required
      
                    autoComplete="off"
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    value={individualPassword}
                    onChange={(e) => setIndividualPassword(e.target.value)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "mr-[10px]" : "text-primary"
                    }
                  >
                    <FaInfoCircle />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>
                </div>
                <div className="pb-md">
                  <FaCheck
                    className={validMatch && matchPwd ? "text-primary ml-[10px]" : "hidden"}
                  />
                  <FaCheck
                    className={validMatch || !matchPwd ? "hidden" : "text-primary ml-[10px]"}
                  />
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="individualconfirmpassword"
                    type="individualconfirmpassword"
                    required
                    placeholder="Confirm Password"
                    value={individualConfirmPassword}
                    onChange={(e) =>
                      setIndividualConfirmPassword(e.target.value)
                    }
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FaInfoCircle />
                    Must match the first password input field.
                  </p>
                </div>
                <div className="">
                  <Checkbox />
                </div>
                <Link to="#" className="">
                  <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]" disabled={!validPwd || !validMatch ? true : false}>
                    Sign up
                  </button>
                </Link>
                <div className="flex flex-col justify-center mx-auto">
                  <p className=" text-sm">
                    Already have an account?
                    <Link to="/logincontainer">
                      <span className="pl-sm pr-sm text-primary">Login</span>
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
                    className="placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
                    id="organisation-name"
                    type="text"
                    required
                    placeholder="First Name"
                    value={organisationFirstName}
                    onChange={(e) => setOrganisationFirstName(e.target.value)}
                  />
                </div>
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="organisation_lastname"
                    type="text"
                    required
                    placeholder="Last Name"
                    value={organisationLastName}
                    onChange={(e) => setOrganisationLastName(e.target.value)}
                  />
                </div>
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
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="organisation_password"
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    value={organisationPassword}
                    onChange={(e) => setOrganisationPassword(e.target.value)}
                  />
                </div>
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="confirm_password"
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={organisationConfirmPassword}
                    onChange={(e) =>
                      setOrganisationConfirmPassword(e.target.value)
                    }
                  />
                </div>

                <div className="">
                  <Checkbox />
                </div>
                <Link to="#" className="">
                  <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
                    Sign up
                  </button>
                </Link>
                <div className="flex flex-col justify-center mx-auto">
                  <p className=" text-sm">
                    Already have an account?
                    <Link to="/logincontainer">
                      <span className="pl-sm pr-sm text-primary">Login</span>
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
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default SignupContainer;
