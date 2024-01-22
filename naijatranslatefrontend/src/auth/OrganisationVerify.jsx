import { useNavigate, useParams, Link } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState,useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrganisationVerify = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [verified, setVerified] = useState("");
  const navigate = useNavigate();
  let params = useParams();

  const [uidb64, token] = params["*"].split("/");

  const confirmVerified = useCallback(async () => {
    try {
      const res = await fetch(
        `http://3.83.243.144/organization/verify-account/${uidb64}/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        setIsSuccess(true);
        toast.success(responseData.message);
        setTimeout(() => {
          navigate("/logincontainer");
        }, 2000);
      } else {
        const errorData = await res.json();
        if (
          "message" in errorData &&
          errorData.error === "Organization with email already verified"
        ) {
          setVerified("Organization with email already verified");
          navigate("/logincontainer");
        } else {
          setVerified(errorData.error);
        }
      }
    } catch (error) {
      toast.error("Request for a new verification link: " + error);
      navigate("/resendverifyaccount");
    }
  }, [uidb64, token, navigate]);

  useEffect(() => {
    confirmVerified();
  }, [confirmVerified]);

  return (
    <div className="p-[20px]">
      <div>
        <Title />
      </div>
      <div className="flex flex-col justify-center items-center align-middle pt-[150px]">
        {isSuccess ? (
          <div className="py-[10px]">
            <h1 className="">Verification successful</h1>
          </div>
        ) : (
          <div className="py-[10px]">
            <h1>{verified}</h1>
          </div>
        )}
        {!isSuccess && (
          <Link
            to="/logincontainer"
            className="bg-primary hover:bg-blue-800 text-white rounded-full px-[10px] py-[3px]"
          >
            Go to Login
          </Link>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default OrganisationVerify;

