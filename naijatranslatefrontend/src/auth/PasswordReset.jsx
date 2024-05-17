import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../api/SpeechApi";
import { toast } from "react-toastify";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    new_password_confirm: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const { new_password, new_password_confirm } = formData;

    try {
      const response = await fetch(`${baseURL}/password-reset/confirm`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password: new_password,
          new_password_confirm: new_password_confirm,
          uid: uidb64,
          token: token,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setTimeout(() => navigate("/login"), 2000);
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
        className="rounded-md flex flex-col content-center items-center w-[360px] sm:w-[340px] mx-auto p-[10px] mt-[70px] border-[1px] gap-[10px]"
      >
        <h1 className="text-center pb-[10px] font-bold text-[20px] leading-[30px]">
          Change your password
        </h1>
        <div className="relative w-full">
          <input
            className="shadow appearance-none flex border rounded-[15px] w-full p-[10px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-[340px]"
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            {...register("new_password")}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <HiOutlineEyeOff size={20} />
            ) : (
              <HiOutlineEye size={20} />
            )}
          </div>
          {errors.new_password && (
            <p className="text-red-500">{errors.new_password.message}</p>
          )}
        </div>

        <div className="relative w-full">
          <input
            className="shadow appearance-none flex border rounded-[15px] w-full p-[10px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            {...register("new_password_confirm")}
          />
          <i
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 h-full"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <HiOutlineEyeOff size={20} />
            ) : (
              <HiOutlineEye size={20} />
            )}
          </i>
        </div>
        {errors.new_password_confirm && (
          <p className="text-red-500">{errors.new_password_confirm.message}</p>
        )}

        <button
          className="bg-primary text-white rounded-full w-full p-[10px]"
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
