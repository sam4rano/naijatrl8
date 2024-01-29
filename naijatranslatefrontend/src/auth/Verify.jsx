import { useNavigate, useParams, Link } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/SpeechApi";

const Verify = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  let params = useParams();
  const { uid, token } = params;

  console.log("params", params);

  const confirmVerified = useCallback(async () => {
    const formData = { uid: uid, token: token };
    try {
      const response = await fetch(`${baseURL}/verify-account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("resp", response);

      if (response.ok) {
        const responseData = await response.json();
        console.log("response", responseData);
        setIsLoading(false);
        setIsSuccess(true);
        toast.success(responseData.message);
        setTimeout(() => {
          navigate("/logincontainer");
        }, 2000);
      } else {
        console.log("error", response);
      }
    } catch (error) {
      console.error("Error during verification:", error);
      navigate("/resendverifyaccount");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, token, uid]);

  // Function to manually trigger the verification
  const handleManualVerification = () => {
    setIsLoading(true);
    confirmVerified();
  };

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
          <div>
            <button
              className="bg-primary text-white rounded-full w-full px-lg h-[40px] mb-4"
              onClick={handleManualVerification}
            >
              Resend Verification Link
            </button>
            <Link to="/resendverifyaccount">Resend Verification Link</Link>
          </div>
        )}
        {!isLoading && isSuccess && <h1>Verification successful</h1>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Verify;
