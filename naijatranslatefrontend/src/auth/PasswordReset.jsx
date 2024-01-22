import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../api/SpeechApi";

const PasswordReset = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const { uidb64, token } = params;

    const confirmPasswordReset = async () => {
      try {
        const response = await fetch(`${baseURL}/password-reset/`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uidb64,
            token,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("data", responseData);
          setIsLoading(false);
          navigate(`/password-reset/confirm/${uidb64}/${token}`);
        } else {
          // Handle error case
          console.error("Error confirming password reset");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error confirming password reset:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    confirmPasswordReset();
  }, [params, navigate]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
         
          <p>PasswordReset</p>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
