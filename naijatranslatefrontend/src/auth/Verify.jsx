import { useNavigate, useParams, Link } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/SpeechApi";
import axios from "axios";


const Verify = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  let params = useParams();

  const [uidb64, token] = params["*"].split("/");

  useEffect(() => {
    const confirmVerified = async () => {
      try {
        const response = await axios.put(
          `${baseURL}/verify-account/`,
          {
            uidb64: uidb64,
            token: token,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log(response)

        
        if (response.status === 200) {
          const responseData = response.data;
          console.log("response", responseData);
          setIsLoading(false);
          setIsSuccess(true);
          toast.success(responseData.message);
          setTimeout(() => {
            navigate("/logincontainer");
          }, 2000);
        } else {
          const errorData = response.data;
          console.log("error", errorData);
        
        }
      } catch (error) {
        console.error("Error during verification:", error);
  
        navigate("/resendverifyaccount");
      } finally {
        setIsLoading(false);
      }
    };

    confirmVerified();
  }, [uidb64, token, navigate]);

  return (
    <div>
      <div className="p-[20px]">
        <div>
          <Title />
        </div>
        
        {isLoading && <p className="flex justify-center mx-auto text-center text-[50px]">Loading...</p>}
        {!isLoading && !isSuccess && (
          <Link to="/resendverifyaccount">Resend Verification Link</Link>
        )}
        {!isLoading && isSuccess && (<h1>Verification successful</h1>)}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Verify;





 // if (
          //   "message" in errorData &&
          //   errorData.message === "User with email already verified"
          // ) {
          //   setVerified("User with email already verified");
          //   setTimeout(() => {
          //     navigate("/logincontainer");
          //   }, 2000);
          // } else {
          //   setVerified(errorData.message);
          // }
