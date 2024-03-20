import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/SpeechApi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

// Validation schema
const userSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

const orgSchema = yup
  .object({
    name: yup.string().required("Organization name is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
      confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

const Signup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tabone");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(activeTab === "tabone" ? userSchema : orgSchema),
  });

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const handleTabOne = () => {
    reset();
    setActiveTab("tabone");
  };

  const handleTabTwo = () => {
    reset();
    setActiveTab("tabtwo");
  };

  const onSubmitUser = async (formData) => {
    setIsLoading(true);
    const payload = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    try {
      const response = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        toast.success(
          "Registration successful. Check your email for verification link."
        );
        setTimeout(() => {
          navigate("/checkinbox");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.email[0]);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmitOrganization = async (formData) => {
    setIsLoading(true);
    const payload = {
      name: formData.name,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    try {
      const response = await fetch(`${baseURL}/organization/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(
          "Registration successful. Check your email for verification link."
        );
        setTimeout(() => {
          navigate("/checkinbox");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.email[0]);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[360px] flex align-middle items-center flex-col sm:w-full pt-[10px] rounded-md mx-auto">
      <h1 className="font-bold text-[25px] leading-[30px] w-full mx-auto text-center sm:text-[18px] sm:leading-[20px] md:text-[16px] py-[10px]">
        Sign up for your account
      </h1>
      <div className="tab-ul flex flex-col">
        <ul className="flex flex-row list-none text-center cursor-pointer justify-around font-normal text-[14px] pb-[10px] leading-4 w-[360px] mx-auto sm:w-[320px]">
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
              onSubmit={handleSubmit(onSubmitUser)}
              className="rounded-md flex flex-col content-center max-w-[360px] sm:w-[320px] mx-auto gap-[7px]"
            >
              <input
                {...register("first_name")}
                placeholder="First Name"
                className="placeholder:p-md appearance-none flex py-[5px] border rounded-[15px] w-full outline-none px-[10px] text-gray-700 leading-tight focus:outline-none "
              />
              {errors.first_name && (
                <p className="text-red-400">
                  {errors.first_name.message}
                </p>
              )}

              <input
                {...register("last_name")}
                placeholder="Last Name"
                className="placeholder:p-md outline-none appearance-none flex py-[5px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
                id="last_name"
              />
              {errors.last_name && (
                <p className="text-red-400">
                  {errors.last_name.message}
                </p>
              )}

              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="placeholder:p-md appearance-none outline-none flex  py-[5px] border rounded-[15px] px-[10px] w-full text-gray-700 leading-tight focus:outline-none "
                id="email"
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
              <div>
                <div className="flex justify-between relative">
                  <input
                    {...register("password")}
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    className="placeholder:p-md appearance-none  py-[5px] border flex  rounded-[15px] w-full text-gray-700 px-[10px] leading-tight focus:outline-none"
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                  >
                    {passwordShown ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </i>
                </div>
                {errors.password && (
                  <p className="text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between relative">
                <input
                  {...register("confirm_password")}
                  type={confirmPasswordShown ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="placeholder:p-md appearance-none  py-[5px] border flex  rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
                />
                <i
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                >
                  {confirmPasswordShown ? (
                    <HiOutlineEyeOff />
                  ) : (
                    <HiOutlineEye />
                  )}
                </i>
              </div>
              {errors.confirm_password && (
                <p className="text-red-400 text-[12px] leading-3 text-center py-[10px]">
                  {errors.confirm_password.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitOrganization)}
              className="rounded-md flex flex-col content-center max-w-[360px] sm:w-[320px] mx-auto gap-[7px]"
            >
              <input
                {...register("name")}
                placeholder="Organization Name"
                className="placeholder:p-md outline-none appearance-none flex  py-[5px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-400">{errors.name.message}</p>
              )}

              <input
                {...register("address")}
                placeholder="address"
                className="placeholder:p-md outline-none appearance-none flex  py-[5px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
              />
              {errors.address && (
                <p className="text-red-400">{errors.address.message}</p>
              )}

              <input
                {...register("city")}
                placeholder="City"
                className="placeholder:p-md outline-none appearance-none flex  py-[5px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
              />
              {errors.city && (
                <p className="text-red-400">{errors.city.message}</p>
              )}

              <input
                {...register("state")}
                placeholder="State"
                className="placeholder:p-md outline-none appearance-none flex  py-[5px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
              />
              {errors.state && (
                <p className="text-red-400">{errors.state.message}</p>
              )}
              <input
                {...register("email")}
                type="email"
                placeholder="email"
                className="placeholder:p-md outline-none appearance-none flex py-[5px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}

              <div className="flex justify-between relative">
                <input
                  {...register("password")}
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  className="placeholder:p-md outline-none appearance-none flex  py-[5px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
                />
                <i
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                >
                  {passwordShown ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </i>
                {errors.password && (
                  <p className="text-red-400">{errors.password.message}</p>
                )}
              </div>
              <div className="flex justify-between relative">
                <input
                  {...register("confirm_password")}
                  type={confirmPasswordShown ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="placeholder:p-md outline-none appearance-none flex py-[5px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none"
                />
                <i
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                >
                  {confirmPasswordShown ? (
                    <HiOutlineEyeOff />
                  ) : (
                    <HiOutlineEye />
                  )}
                </i>
                {errors.confirm_password && (
                  <p className="text-red-400">{errors.confirm_password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
        <div className="flex flex-col justify-center mx-auto py-[10px]">
          <p className="text-[18px] leading-[20px]">
            Already have an account?
            <Link to="/login">
              <span className="pl-sm pr-sm text-primary">Login</span>
            </Link>
          </p>
          <Link
            to="/forgotpassword"
            className="underline underline-offset-4 mx-auto"
          >
            Forgot Password
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;

