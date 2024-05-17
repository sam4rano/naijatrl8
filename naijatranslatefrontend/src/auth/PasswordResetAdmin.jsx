import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../api/SpeechApi";
import { toast } from "react-toastify";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"; // Import icons

const PasswordReset = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const schema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { password, confirm_password } = data;

    try {
      const response = await fetch(`${baseURL}/organization/password-reset/confirm`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_password: password,new_password_confirm:confirm_password, uid, token }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Password reset failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-[10px] flex flex-col content-center max-w-[360px] mx-auto p-[10px] mt-[70px] border-[1px] w-[360px] sm:w-[340px]"
      >
        <h1 className="text-center pb-[10px]">Change your password</h1>

        <div className="relative pb-md">
          <input
            className="shadow placeholder:p-[10px] appearance-none flex py-[10px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-[340px]"
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            {...register("password")}
          />
          <i
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
          </i>
          <p className="text-red-500">{errors.password?.message}</p>
        </div>

        <div className="relative pb-[10px]">
          <input
            className="shadow placeholder:p-[10px] appearance-none flex py-[10px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            {...register("confirm_password")}
          />
          <i
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
          </i>
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        </div>

        <button
          className="bg-primary text-white rounded-full w-full px-[10px] py-[10px]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Next"}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;

