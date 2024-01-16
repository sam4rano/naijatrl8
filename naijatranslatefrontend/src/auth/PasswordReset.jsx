import { useNavigate, useParams } from "react-router-dom";
import Title from "../utils/Title";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/SpeechApi";

const PasswordReset = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  let params = useParams();

  const [uidb64, token] = params["*"].split("/");
  console.log(uidb64, token);

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      new_password: userPassword,
      new_password_confirm: confirmUserPassword,
      uid: uidb64,
      token: token,
    };

    try {
      const response = await fetch(`${baseURL}/password-reset/confirm`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setIsLoading(false);
        const responseData = await response.json();
        toast.success(responseData.message);
        setTimeout(() => {
          navigate("/logincontainer");
        }, 2000);
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
      <div className="p-[20px]">
        <div>
          <Title />
        </div>

        {isSuccess && (
          <form
            onSubmit={handleSubmitUser}
            className="rounded-md flex flex-col content-center max-w-[340px] mx-auto p-md mt-[70px] border-[1px]"
          >
            <h1 className="text-center pb-[10px]">Change your password</h1>
            <div className="pb-md">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="password"
                type="password"
                value={userPassword}
                placeholder="New password"
                minLength={8}
                required
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </div>
            <div className="pb-md">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="confirm_password"
                type="password"
                placeholder="Confirm password"
                required
                minLength={8}
                value={confirmUserPassword}
                onChange={(e) => {
                  setConfirmUserPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Next"}
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordReset;
