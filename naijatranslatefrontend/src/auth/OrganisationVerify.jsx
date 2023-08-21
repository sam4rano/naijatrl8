import { useNavigate, useParams } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState } from "react";

const OrganisationVerify = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  let params = useParams();

  const navigate = useNavigate();
  console.log(params);

  const [uidb64, token] = params["*"].split("/");
  console.log(uidb64, token);

  useEffect(() => {
    const confirmVerified = async () => {
      try {
        const res = await fetch(
          `http://3.83.243.144/organization/verify-account/${uidb64}/${token}?format=json`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const responseData = await res.json(); // Parse the JSON response
          console.log(responseData);
          navigate("/logincontainer");
          setIsSuccess(true);
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }
      } catch (error) {
        alert("An error occurred: " + error.message);
        setError(error.message);
      }
    };
    confirmVerified();
  }, [uidb64, token, navigate]);
  return (
    <div className="p-[20px]">
      <div>
        <Title />
      </div>
      {isSuccess ? (
        <h1>Congratulations! You have been successfully verified.</h1>
      ) : (
        <h1>Verification failed...</h1>
      )}
    </div>
  );
};

export default OrganisationVerify;
