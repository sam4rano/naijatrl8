import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/SpeechApi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import "./Tabcontainer.css";

const LoginContainer = () => {
  const loginSchema = yup
    .object({
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    })
    .required();

  const userSchema = yup
    .object({
      individualEmail: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      individualPassword: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
    })
    .required();

  const orgSchema = yup.object({
    orgEmail: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    orgPwd: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const [activeTab, setActiveTab] = useState("tabone");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(activeTab === "tabone" ? userSchema : orgSchema),
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const handleTabOne = () => {
    reset();
    setActiveTab("tabone");
  };

  const handleTabTwo = () => {
    reset();
    setActiveTab("tabtwo");
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmitUser = async (formData) => {
    setIsLoading(true);
    const payload = {
      email: formData.individualEmail,
      password: formData.individualPassword,
    };

    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        toast.success("Login successful.");
        const data = await response.json();

        const accessToken = data.access;
        const isOrg = data.is_organization;

        document.cookie = `access_token=${accessToken}; Secure; SameSite=None`;
        if (isOrg) {
          localStorage.setItem("isOrg", JSON.stringify(true));
          setTimeout(() => {
            navigate("/adminlayout"), 2000;
          });
        } else {
          setTimeout(() => {
            navigate("/translateregisteredusers"), 2000;
          });
        }
      } else {
        const data = await response.json();
        toast.error(data.detail);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  //admin login
  const onSubmitAdmin = async (formData) => {
    setIsLoading(true);
    const payload = {
      email: formData.orgEmail,
      password: formData.orgPwd,
    };

    try {
      const response = await fetch(`${baseURL}/organization/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        toast.success("Login successful.");
        setIsLoading(false);
        setIsAdmin(!isAdmin);

        const data = await response.json();
        const accessToken = data.access;

        localStorage.setItem("isAdmin", JSON.stringify(true));

        document.cookie = `access_token=${accessToken}; Secure; SameSite=None`;
        navigate("/adminlayout");

        if (isOrg) {
          localStorage.setItem("isOrg", JSON.stringify(true));
          setTimeout(() => {
            navigate("/adminlayout"), 2000;
          });
        } else {
          setTimeout(() => {
            navigate("/translateregisteredusers"), 2000;
          });
        }
      } else {
        const data = await response.json();
        toast.error(data.detail);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

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
                onSubmit={handleSubmit(onSubmitUser)}
                className="rounded-md flex flex-col content-center max-w-[360px] mx-auto gap-[5px]"
              >
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md appearance-none px-[10px] outline-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
                    {...register("individualEmail", {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/,
                    })}
                    type="email"
                    placeholder="Email"
                  />
                  {errors.individualEmail && (
                    <p className="text-red-400 text-center">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="flex justify-between relative">
                  <input
                    className="placeholder:p-md appearance-none px-[10px] h-[40px] border rounded-[15px] w-full pr-10 text-gray-700 leading-tight focus:outline-none"
                    id="individual_password"
                    {...register("individualPassword", { required: true })}
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    minLength={8}
                    autoComplete="off"
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                  >
                    {passwordShown ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </i>
                </div>
                {errors.individualPassword && (
                  <p className="text-red-400 text-center">
                    This field is required
                  </p>
                )}

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
                      <span className="pl-sm pr-sm text-primary font-medium text-[14px]">
                        Sign Up
                      </span>
                    </Link>
                  </p>
                  <Link
                    to="/forgotpassword"
                    className="underline underline-offset-2 mx-auto"
                  >
                    <h2 className="underline underline-offset-2 font-bold">
                      Forgot Password
                    </h2>
                  </Link>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmitAdmin)}
                className="rounded-md flex flex-col content-center max-w-[360px] mx-auto gap-[5px]"
              >
                <div className="pb-sm">
                  <input
                    className="placeholder:p-md px-[10px] appearance-none  h-[40px] border flex  rounded-[15px] w-full text-gray-700 leading-tight focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Organisation Email"
                  />
                </div>
                {errors.organisationEmail && (
                  <p className="text-red-400">This field is required</p>
                )}
                <div className="relative">
                  <input
                    className="placeholder:p-md appearance-none px-[10px]  h-[40px] border flex  rounded-[15px] w-full text-gray-700 leading-tight focus:outline-none"
                    id="organisation_password"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Admin Password"
                    minLength={8}
                    autoComplete="off"
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                  >
                    {passwordShown ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </i>
                </div>
                {errors.organisationPassword && (
                  <p className="text-red-400">This field is required</p>
                )}
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
                      <span className="pl-sm pr-sm text-primary font-medium text-[14px]">
                        Sign Up
                      </span>
                    </Link>
                  </p>
                  <Link to="/forgotpassword" className="mx-auto">
                    <h2 className="underline underline-offset-2 font-bold">
                      Forgot Password
                    </h2>
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
