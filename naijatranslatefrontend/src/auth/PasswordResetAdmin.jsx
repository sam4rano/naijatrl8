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
  // console.log("params", params);

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
    console.log("formdata", formData);
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
        // console.log("resp", responseData);
        toast.success(responseData.message);

        setTimeout(() => {
          // Only navigate to login container if the password reset is successful
          navigate("/logincontainer");
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
    </div>
  );
};

export default PasswordReset;
