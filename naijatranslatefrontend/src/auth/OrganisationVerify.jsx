import { useNavigate, useParams, Link } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrganisationVerify = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [verified, setVerified] = useState("");
  const navigate = useNavigate();
  let params = useParams();

  const [uidb64, token] = params["*"].split("/");

  useEffect(() => {
    const confirmVerified = async () => {
      try {
        const res = await fetch(
          `http://3.83.243.144/organization/verify-account/${uidb64}/${token}`,
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
          setTimeout(() => {
            navigate("/logincontainer"); // Navigate after a delay
          }, 2000);
          // navigate("/logincontainer");
        } else {
          const errorData = await res.json();
          if (
            "message" in errorData &&
            errorData.message === "Admin with email already verified"
          ) {
            setVerified("Admin with email already verified");
            setTimeout(() => {
              navigate("/logincontainer"); // Navigate after a delay
            }, 2000);
            // navigate("/logincontainer");
          } else {
            setVerified(errorData.message);
          }
        }
      } catch (error) {
        console.log(error);
        navigate("/resendverification");
      }
    };
    confirmVerified();
  }, [uidb64, token, navigate, isSuccess]);

  return (
    <div>
      <div className="p-[20px]">
        <div>
          <Title />
        </div>
        {verified && (
          <Link to="/resendverification">Resend Verification Link</Link>
        )}
        {isSuccess ? <h1>Verification successful</h1> : <h1>{verified}</h1>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrganisationVerify;
