// import { useParams } from "react-router-dom";
// import Title from "../utils/Title";
// import { useEffect, useState } from "react";

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// const Verify = () => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState("");
//   let params = useParams();
//   console.log(params);

//   const [key, token] = params["*"].split("/");
//   console.log(key, token);

//   useEffect(() => {
//     const confirmVerified = async () => {
//       try {

//         const res = await fetch(
//           `http://3.83.243.144/verify-account/${key}/${token}?format=json`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (res.ok) {
//           console.log(res.json());
//           setIsSuccess(true);
//         } else {
//           const errorData = await res.json();
//           throw new Error(errorData.error);
//         }
//       } catch (error) {
//         alert("An error occurred: " + error.message);
//         setError(error.message);
//       }
//     };
//     confirmVerified();
//   }, [isSuccess, error, key, token]);

//   return (
//     <div className="p-[20px]">
//       <div>
//         <Title />
//       </div>
//       {isSuccess ?
//         <h1>Congratulations you have been successfuly verified</h1>:<h1>Verification failed... </h1> 
//       }
//       <div>
//       </div>
//     </div>
//   );
// };

// export default Verify;


import { useNavigate, useParams } from "react-router-dom";
import Title from "../utils/Title";
import { useEffect, useState } from "react";


const Verify = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate()
  let params = useParams();
  console.log(params);

  const [uidb64, token] = params["*"].split("/");
  console.log(uidb64, token);

  useEffect(() => {
    const confirmVerified = async () => {
      try {
        const res = await fetch(
          `http://3.83.243.144/verify-account/${uidb64}/${token}?format=json`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const responseData = await res.json(); // Parse the JSON response
          console.log(responseData); // Log the parsed data
          setIsSuccess(true);
          navigate("/logincontainer")
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

export default Verify;

