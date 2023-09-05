import { useState } from "react";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupContainer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tabone");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

  const [individualEmail, setIndividualEmail] = useState("");
  // ... other state variables ...

  const handleTabOne = () => {
    setActiveTab("tabone");
  };
  const handleTabTwo = () => {
    setActiveTab("tabtwo");
  };

  // Function to perform client-side password validation
  const validatePassword = (password) => {
    // Define password complexity requirements
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigitOrSpecialChar = /[0-9!@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(
      password
    );

    if (
      password.length < minLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasDigitOrSpecialChar
    ) {
      return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit or special character.";
    }

    return ""; // Password meets complexity requirements
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    const passwordValidationMessage = validatePassword(individualPassword);

    if (passwordValidationMessage) {
      // Display password validation message
      setPasswordValidationMessage(passwordValidationMessage);
      return; // Don't submit the form if the password is invalid
    }

    // Rest of your code for individual user registration
  };

  // ... other form handlers ...

  return (
    <div className="p-[10px]">
      <Title />
      <div className="w-[340px] mx-auto pt-[30px]">
        <h1 className="font-[700] justify-center align-middle text-[18px] leading-4 flex w-full h-[33px] mx-auto text-center">
          Sign up for your account account
        </h1>
        <div className="tab-ul flex flex-col">
          {/* ... */}
          {activeTab === "tabone" ? (
            <form
              onSubmit={handleSubmitUser}
              className="rounded-md flex flex-col content-center max-w-[448px] mx-auto p-[10px]"
            >
              {/* ... */}
              <div className="pb-md">
                <input
                  // ... other input fields ...
                />
              </div>
              <div className="pb-md">
                <input
                  className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
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
              <div className="pb-md">
                <input
                  // ... other input fields ...
                />
              </div>
              {/* Display password validation message */}
              {passwordValidationMessage && (
                <p className="text-red-500 text-[12px] leading-3 text-center p-[10px]">
                  {passwordValidationMessage}
                </p>
              )}
              <button
                className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                type="submit"
              >
                Sign up
              </button>
              {/* ... */}
            </form>
          ) : (
            {/* ... */}
          )}
          {/* ... */}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignupContainer;
