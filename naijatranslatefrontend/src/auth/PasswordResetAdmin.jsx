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

  const navigate = useNavigate();
  let params = useParams();

  const [uidb64, token] = params["*"].split("/");
  console.log(uidb64, token);

  useEffect(() => {
    const confirmVerified = async () => {
      try {
        const res = await fetch(
          `http://3.83.243.144/organization/password-reset/${uidb64}/${token}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const responseData = await res.json();
          console.log("resp", responseData); // Log the parsed data
          setIsSuccess(true);
          toast.success(responseData.message);
          // navigate("/logincontainer");
        } else {
          const errorData = await res.json();
          if (
            "message" in errorData &&
            errorData.message === "Admin with email already verified"
          ) {
            setVerified("Admin with email already verified");
            // navigate("/logincontainer");
          } else {
            setVerified(errorData.message);
            // navigate("/resendverifyaccount");
          }
        }
      } catch (error) {
        console.log(error);
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
      organization_id: 0,
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
        const data = await response.json();
        console.log("password changed successfully", data);
        toast.message(data);
        setTimeout(() => {
          navigate("/logincontainer");
        }, 2000);
      } else {
        console.log("Failed to change password");
      }
    } catch (error) {
      toast.error(error);
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
        {/* {verified &&  <div>{verified}</div> : null} */}
        {isSuccess ? (
          <form
            onClick={handleSubmitAdmin}
            className="rounded-md flex flex-col content-center max-w-[340px] mx-auto p-md"
          >
            <div className="pb-md">
              <input
                className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="password"
                type="text"
                placeholder="new password"
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
                type="text"
                placeholder="confirm password"
                required
                onChange={(e) => {
                  setConfirmAdminPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
              type="submit"
            >
              Send Instructions
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
