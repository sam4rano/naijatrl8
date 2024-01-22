import { useNavigate, useParams, Link } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordResetAdmin = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [verified, setVerified] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  let params = useParams();

  const [uidb64, token] = params["*"].split("/");

  useEffect(() => {
    const confirmVerified = async () => {
      try {
        const res = await fetch(
          `http://3.83.243.144/organization/password-reset/${uidb64}/${token}`,
          {
            method:"PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const responseData = await res.json();
          setIsSuccess(true);
          toast.success(responseData.message);
        } else {
          const errorData = await res.json();
          if (
            "message" in errorData &&
            errorData.message === "Organization with email already verified"
          ) {
            setVerified("Organization with email already verified");
          } else {
            setVerified(errorData.message);
            navigate("/resendverifyaccount");
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while confirming.");
      }
    };
    confirmVerified();
  }, [uidb64, token, navigate, isSuccess]);

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();

    const formData = {
      new_password: adminPassword,
      new_password_confirm: confirmAdminPassword,
      uid: uidb64,
      token: token,
      organization_id: 3,
    };

    try {
      const response = await fetch(
        "http://3.83.243.144/api/v1/organization/password-reset/confirm",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Password reset successful.");
        navigate("/logincontainer");
        
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
        {verified && (
          <Link to="/resendverification">Resend Verification Link</Link>
        )}

        {isSuccess ? (
          <form
            onSubmit={handleSubmitAdmin}
            className="rounded-md flex flex-col content-center max-w-[340px] mx-auto p-md mt-[70px] border-[1px]"
          >
            <h1 className="text-center pb-[10px]">Change your password</h1>
            <div className="pb-md">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="password"
                type="password"
                value={adminPassword}
                placeholder="New password"
                minLength={8}
                required
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                }}
              />
            </div>
            <div className="pb-md">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="confirm_password"
                type="password"
                placeholder="Confirm admin password"
                required
                minLength={8}
                value={confirmAdminPassword}
                onChange={(e) => {
                  setConfirmAdminPassword(e.target.value);
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
        ) : (
          <h1>{verified}</h1>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordResetAdmin;
