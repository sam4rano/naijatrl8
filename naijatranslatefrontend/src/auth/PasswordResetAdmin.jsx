import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../api/SpeechApi";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  

  const { uid, token } = params;

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (userPassword !== confirmUserPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const formData = {
      new_password: userPassword,
      new_password_confirm: confirmUserPassword,
      uid: uid,
      token: token,
    };
    
    try {
      const response = await fetch(
        `${baseURL}/organization/password-reset/confirm`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        
        toast.success(responseData.message);

        setTimeout(() => {
          
          navigate("/login");
        }, 3000);
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
        onSubmit={handleSubmitUser}
        className="rounded-[10px] flex flex-col content-center max-w-[360px] mx-auto p-[10px] mt-[70px] border-[1px]"
      >
        <h1 className="text-center pb-[10px]">Change your password</h1>
        <div className="pb-md">
          <input
            className="shadow placeholder:p-[10px] appearance-none flex py-[10px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
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
        <div className="pb-[10px]">
          <input
            className="shadow placeholder:p-[10px] appearance-none flex py-[10px] border rounded-[15px] w-full px-[10px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
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
