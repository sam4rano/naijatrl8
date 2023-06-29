import { Link } from "react-router-dom";
import Checkbox from "../utils/Checkbox";
import Title from "../utils/Title";
import LogInfo from "./LogInfo";
import { useState } from "react";

const InSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://3.83.243.144/api/v1/register";

    const formData = {
      email:email,
      name:name,
      password:password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Registration successful");
      } else {
        // Handle error response
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }

    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  // Form submission function

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md flex flex-col content-center max-w-[500px] mx-auto mt-[100px] p-md"
    >
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none border-gray-500 flex h-[40px] border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none flex h-[40px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none h-[40px] border flex rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none flex h-[40px] border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
      </div>
      <div>
        <Checkbox />
      </div>
      <Link to="/signinuser" className="">
        <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
          Submit
        </button>
      </Link>
      <p className="text-sm">
        By signing in, you agree that you have read and understood, and agree to
        the
        <span className="pl-sm pr-sm">
          <Title />
        </span>
        Terms of Service and Privacy Policy of Service
      </p>
      <div>
        <LogInfo />
      </div>
    </form>
  );
};

export default InSignup;
