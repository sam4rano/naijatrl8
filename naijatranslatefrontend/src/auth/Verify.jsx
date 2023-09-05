import { useNavigate, useParams, Link } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [verified, setVerified] = useState("");
  const navigate = useNavigate();
  let params = useParams();

  const [uidb64, token] = params["*"].split("/");

  useEffect(() => {
    const confirmVerified = async () => {
      try {
        const res = await fetch(
          `http://3.83.243.144/verify-account/${uidb64}/${token}`,
          {
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
            errorData.message === "User with email already verified"
          ) {
            setVerified("User with email already verified");
            setTimeout(() => {
              navigate("/logincontainer");
            }, 2000);
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

export default Verify;
