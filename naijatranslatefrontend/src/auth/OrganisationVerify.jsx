import { useNavigate, useParams, Link } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/SpeechApi";

const OrganisationVerify = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  let params = useParams();

  const [uid, token] = params["*"].split("/");

  const confirmVerified = useCallback(async () => {
    try {
      const response = await fetch(`${baseURL}/organization/verify-account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          token: token,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsLoading(false);
        setIsSuccess(true);
        toast.success(responseData.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(responseData.message);
        setIsLoading(false);}
    } catch (error) {
      toast.error(error.message);
      navigate("/resendverifyaccount");
    } finally {
      setIsLoading(false);
    }
  }, [uid, token, navigate]);

  useEffect(() => {
    confirmVerified();
  }, [confirmVerified]);

  return (
    <div>
      <div className="p-[20px]">
        <div>
          <Title />
        </div>

        {isLoading && (
          <p className="flex justify-center mx-auto text-center text-[50px]">
            Loading...
          </p>
        )}
        {!isLoading && !isSuccess && (
          <Link to="/resendverifyaccount">Resend Verification Link</Link>
        )}
        {!isLoading && isSuccess && <h1>Verification successful</h1>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrganisationVerify;
