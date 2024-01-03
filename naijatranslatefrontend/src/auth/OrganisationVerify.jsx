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
        
        toast.error("request for new verification link"+error)
        navigate("/resendverification");
      }
    };
    confirmVerified();
  }, [uidb64, token, navigate, isSuccess]);

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


// import { useNavigate, useParams, Link } from "react-router-dom";
// import Title from "../utils/Title";
// import { useQuery } from 'react-query';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const OrganisationVerify = () => {
//   const navigate = useNavigate();
//   let params = useParams();
//   const [uidb64, token] = params["*"].split("/");

//   const { status, data } = useQuery(
//     ['verification', uidb64, token],
//     async () => {
//       const res = await fetch(
//         `http://3.83.243.144/organization/verify-account/${uidb64}/${token}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (!res.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return res.json();
//     },
//     {
//       onSuccess: (responseData) => {
//         toast.success(responseData.message);
//         navigate("/logincontainer");
//       },
//       onError: (error) => {
//         toast.error(`Request for new verification link: ${error.message}`);
//         navigate("/resendverifyaccount");
//       },
//     }
//   );

//   return (
//     <div className="p-[20px]">
//       <div>
//         <Title />
//       </div>
//       <div className="flex flex-col justify-center items-center align-middle pt-[150px]">
//         {status === 'success' ? (
//           <div className="py-[10px]">
//             <h1 className="">Verification successful</h1>
//           </div>
//         ) : (
//           <div className="py-[10px]">
//             <h1>{status === 'loading' ? 'Loading...' : 'Error'}</h1>
//           </div>
//         )}
//         {status === 'success' && (
//           <Link
//             to="/logincontainer"
//             className="bg-primary hover:bg-blue-800 text-white rounded-full px-[10px] py-[3px]"
//           >
//             Go to Login
//           </Link>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default OrganisationVerify;

