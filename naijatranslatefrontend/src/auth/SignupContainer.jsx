import { useState } from "react";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@mui/material/Checkbox";

const SignupContainer = () => {
  const navigate = useNavigate();
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
  const [acctManagerFname, setAcctManagerFname] = useState("");
  const [acctManagerLname, setAcctManagerLname] = useState("");
  const [acctManagerEmail, setAcctManagerEmail] = useState("");
  const [acctManagerPwd, setAcctManagerPwd] = useState("");

  const [success, setSuccess] = useState(false);

  const [checked, setChecked] = useState(true);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

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

    if (!passwordPattern.test(individualPassword)) {
      toast.error(
        "Password must contain at least one letter, one number, and be at least 8 characters long."
      );
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
      });

      if (responseUser.ok) {
        const data = await responseUser.json();

        setSuccess(true);
        toast.success(data.success);
        navigate("/logincontainer");
      } else {
        const data = await responseUser.json();

        toast.error(data.email[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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

    // if (!orgEmail || !orgPwd) {
    //   toast.error("Please fill in all fields.");
    //   return;
    // }

    // const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // if (!passwordPattern.test(orgPwd)) {
    //   toast.error(
    //     "Password must contain at least one letter, one number, and be at least 8 characters long."
    //   );
    //   return;
    // }

    const unCheckedFormData = {
      name: orgName,
      address: orgAddress,
      city: orgCity,
      state: orgState,
      email: orgEmail,
      password: orgPwd,
      confirm_password: orgConfirmPwd,
      account_manager_first_name: acctManagerFname,
      account_manager_last_name: acctManagerLname,
      account_manager_email: acctManagerEmail,
      account_manager_password: acctManagerPwd,
    };

    const checkedFormData = {
      name: orgName,
      address: orgAddress,
      city: orgCity,
      state: orgState,
      email: orgEmail,
      account_manager_first_name: acctManagerFname,
      account_manager_last_name: acctManagerLname,
      account_manager_email: acctManagerEmail,
    };

    console.log("FORM DATA",checkedFormData)

    console.log("FORM DATA",unCheckedFormData)
    try {
      const response = await fetch(
        "http://3.83.243.144/api/v1/organization/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checked ? checkedFormData : unCheckedFormData),
        }
      );

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
      <Title />
      <div className="w-[340px] mx-auto pt-[30px] rounded-md">
        <h1 className="font-[700] justify-center align-middle text-[18px] leading-4 flex w-full h-[33px] mx-auto text-center">
          Sign up for your account account
        </h1>
        <div className="tab-ul flex flex-col">
          <ul className="flex flex-row list-none text-center cursor-pointer justify-around font-[400] text-[13px] pb-[20px] leading-4 w-[327px] mx-auto">
            <li
              onClick={handleTabOne}
              className={`cursor-pointer text-[14px] w-full rounded-full font-[600] ${
                activeTab === "tabone"
                  ? "active text-white bg-primary rounded-full"
                  : "text-dark bg-gray"
              } `}
            >
              INDIVIDUAL
            </li>
            <li
              onClick={handleTabTwo}
              className={`cursor-pointer text-[14px] w-full rounded-full font-[600] ${
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
                    className="placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full outline-none px-[10px] text-gray-700 leading-tight focus:outline-none "
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
                    className="placeholder:p-md outline-none appearance-none flex  h-[40px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none "
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
                    className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
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
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
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
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
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
                    <Link to="/logincontainer">
                      <span className="pl-sm pr-sm text-primary">Login</span>
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
              <>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                {checked ? <h3>Register your organisation</h3> : <h3> Don't Register your organisation</h3>}
                {checked ? (
                  <form
                    onSubmit={handleSubmitAdmin}
                    className="rounded-md flex flex-col content-center max-w-[448px] mx-auto"
                  >
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none "
                        id="organisation name"
                        type="text"
                        required
                        placeholder="Organisation Name"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                        id="organisation-address"
                        type="text"
                        required
                        placeholder="Organisation address"
                        value={orgAddress}
                        onChange={(e) => setOrgAddress(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
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
                    <div className="pb-sm">
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
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                        id="Organsisation_email"
                        type="text"
                        placeholder="Organisation Email"
                        required
                        value={orgEmail}
                        onChange={(e) => setOrgEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                        id="acct_first_name"
                        type="text"
                        placeholder="Account Manager First Name"
                        required
                        value={acctManagerFname}
                        onChange={(e) => setAcctManagerFname(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none "
                        id="acct_last_name"
                        type="text"
                        required
                        placeholder="Account Manager Last Name"
                        value={acctManagerLname}
                        onChange={(e) => setAcctManagerLname(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                        id="account_manager_email"
                        type="text"
                        required
                        placeholder="Account Manager Email"
                        value={acctManagerEmail}
                        onChange={(e) => setAcctManagerEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                        id="email"
                        type="password"
                        placeholder="Account Manager Password "
                        required
                        value={acctManagerPwd}
                        minLength={8}
                        onChange={(e) => setAcctManagerPwd(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <p className="text-primary text-[12px] leading-3 text-center pb-[10px]">
                      Passwords must be at least 8 characters in length, at
                      least one uppercase character, at least one lowercase
                      character, and must contain at least one digit character
                      OR a symbol.
                    </p>
                    <button
                      className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                      type="submit"
                    >
                      Sign up
                    </button>
                    {/* <Link to="#" className="">
            </Link> */}
                    <div className="flex flex-col justify-center mx-auto py-[10px]">
                      <p className=" text-sm">
                        Already have an account?
                        <Link to="/logincontainer">
                          <span className="pl-sm pr-sm text-primary">
                            Login
                          </span>
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
                    <div className="pb-sm">
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
                    <div className="pb-sm">
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
                    <div className="pb-sm">
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
                    <div className="pb-sm">
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
                    <div className="pb-sm">
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
                    <div className="pb-sm">
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
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                        id="acct_first_name"
                        type="text"
                        placeholder="account manager first name"
                        required
                        value={acctManagerFname}
                        onChange={(e) => setAcctManagerFname(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none "
                        id="acct_last_name"
                        type="text"
                        required
                        placeholder="account manager last Name"
                        value={acctManagerLname}
                        onChange={(e) => setAcctManagerLname(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                        id="account_manager_email"
                        type="text"
                        required
                        placeholder="account manager email"
                        value={acctManagerEmail}
                        onChange={(e) => setAcctManagerEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="pb-sm">
                      <input
                        className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                        id="email"
                        type="password"
                        placeholder="account manager password "
                        required
                        value={acctManagerPwd}
                        minLength={8}
                        onChange={(e) => setAcctManagerPwd(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <p className="text-primary text-[12px] leading-3 text-center pb-[10px]">
                      Passwords must be at least 8 characters in length, at
                      least one uppercase character, at least one lowercase
                      character, and must contain at least one digit character
                      OR a symbol.
                    </p>
                    <button
                      className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                      type="submit"
                    >
                      Sign up
                    </button>
                    {/* <Link to="#" className="">
              </Link> */}
                    <div className="flex flex-col justify-center mx-auto py-[10px]">
                      <p className=" text-sm">
                        Already have an account?
                        <Link to="/logincontainer">
                          <span className="pl-sm pr-sm text-primary">
                            Login
                          </span>
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
              </>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default SignupContainer;
