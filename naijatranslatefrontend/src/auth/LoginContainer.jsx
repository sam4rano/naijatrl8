// import { useState } from "react";
// import Title from "../utils/Title";
// import "./Tabcontainer.css";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const LoginContainer = () => {
//   const [activeTab, setActiveTab] = useState("tabone");

//   const [individualEmail, setIndividualEmail] = useState("");
//   const [organisationEmail, setOrganisationEmail] = useState("");

//   const [individualPassword, setIndividualPassword] = useState("");
//   const [organisationPassword, setOrganisationPassword] = useState("");

//   const [registrationSuccess, setRegistrationSuccess] = useState(false);

//   const navigate = useNavigate();

//   const handleTabOne = () => {
//     setActiveTab("tabone");
//   };
//   const handleTabTwo = () => {
//     setActiveTab("tabtwo");
//   };

//   const handleSubmitUser = async (e) => {
//     e.preventDefault();

//     const formData = {
//       email: individualEmail,
//       password: individualPassword,
//     };

//     try {
//       const response = await fetch("http://3.83.243.144/api/v1/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),

//       });
//       console.log("response data", response);

//       if (response.ok) {

//         toast.success("Registration successful");
//         const data = await response.json();
//         const accessToken = data.access_token;
//         console.log("Registration successful");
//         setRegistrationSuccess(true);
//         // Save the access token in an HttpOnly cookie
//         document.cookie = `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict`;

//         navigate("/translateveruser");
//       } else {
//         console.log("Registration failed");
//         const data = await response.json();

//         toast.error(data.detail);
//       }
//     } catch (error) {
//       console.log("An error occurred:", error);
//       toast.error("An error occurred");
//     }
//   };
//   const handleSubmitAdmin = async (e) => {
//     e.preventDefault();

//     const formData = {
//       email: organisationEmail,
//       password: organisationPassword,
//     };

//     try {
//       const response = await fetch(
//         "http://3.83.243.144/api/v1/organization/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         const accessToken = data.access_token;
//         console.log("Registration successful");
//         setRegistrationSuccess(true);
//         // Save the access token in an HttpOnly cookie
//         document.cookie = `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict`;
//         navigate("/translateveruser");
//         toast.success("Registration successful");
//       } else {
//         const data = await response.json();
//         toast.error(data.detail);
//       }
//     } catch (error) {
//       console.log("An error occurred:", error);
//       toast.error("An error occurred");
//     }
//   };

//   return (
//     <div className="p-[10px]">
//       <Title />
//       <div className="w-[340px] mx-auto pt-[50px]">
//         <h1 className="font-[700] justify-center align-middle text-[18px] leading-4 flex w-full h-[33px] mx-auto text-center">
//           Login to your account account
//         </h1>
//         <div className="tab-ul flex flex-col">
//           <ul className="flex flex-row list-none text-center cursor-pointer justify-around font-[400] text-[13px] pb-[20px] leading-4 w-[327px] mx-auto">
//             <li
//               onClick={handleTabOne}
//               className={`cursor-pointer rounded-full font-[600] ${
//                 activeTab === "tabone"
//                   ? "active text-white bg-primary rounded-full"
//                   : "text-dark bg-gray"
//               } `}
//             >
//               Individual
//             </li>
//             <li
//               onClick={handleTabTwo}
//               className={`cursor-pointer rounded-full font-[600] ${
//                 activeTab === "tabtwo"
//                   ? "active text-white bg-primary rounded-full"
//                   : "text-dark bg-gray "
//               } `}
//             >
//               Organisation
//             </li>
//           </ul>
//           <div>
//             {activeTab === "tabone" ? (
//               <form
//                 onSubmit={handleSubmitUser}
//                 className="rounded-md flex flex-col content-center max-w-[448px] mx-auto p-[10px]"
//               >
//                 <div className="pb-md">
//                   <input
//                     className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
//                     id="individualemail"
//                     type="text"
//                     placeholder="Email"
//                     required
//                     value={individualEmail}
//                     onChange={(e) => setIndividualEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="pb-[20px]">
//                   <input
//                     className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
//                     id="individual_password"
//                     type="password"
//                     placeholder="Password"
//                     required
//                     minLength={8}
//                     value={individualPassword}
//                     onChange={(e) => setIndividualPassword(e.target.value)}
//                     autoComplete="off"
//                   />
//                 </div>
//                 <button
//                   className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
//                   type="submit"
//                 >
//                   Log in
//                 </button>
//                 {/* <Link to="#" className="pb-[20px]">
//                 </Link> */}
//                 <div className="flex flex-col justify-center mx-auto">
//                   <p className=" text-sm">
//                     Sign up for an account?
//                     <Link to="/signupcontainer">
//                       <span className="pl-sm pr-sm text-primary">Sign Up</span>
//                     </Link>
//                   </p>
//                   <Link
//                     to="/passwordresetinvoke"
//                     className="underline underline-offset-8 mx-auto"
//                   >
//                     Forgot Password
//                   </Link>
//                 </div>
//               </form>
//             ) : (
//               <form
//                 onSubmit={handleSubmitAdmin}
//                 className="rounded-md flex flex-col content-center max-w-[448px] mx-auto p-[10px]"
//               >
//                 <div className="pb-md">
//                   <input
//                     className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
//                     id="email"
//                     type="email"
//                     placeholder="Organisation Email"
//                     required
//                     value={organisationEmail}
//                     onChange={(e) => setOrganisationEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="pb-[20px]">
//                   <input
//                     className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
//                     id="organisation_password"
//                     type="password"
//                     placeholder="admin Password"
//                     required
//                     minLength={8}
//                     value={organisationPassword}
//                     onChange={(e) => setOrganisationPassword(e.target.value)}
//                     autoComplete="off"
//                   />
//                 </div>
//                 <button
//                   className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
//                   type="submit"
//                 >
//                   Log in
//                 </button>

//                 <div className="flex flex-col justify-center mx-auto">
//                   <p className=" text-sm">
//                     Sign up for an account?
//                     <Link to="/signupcontainer">
//                       <span className="pl-sm pr-sm text-primary">Sign Up</span>
//                     </Link>
//                   </p>
//                   <Link
//                     to="/passwordresetinvoke"
//                     className="underline underline-offset-8 mx-auto"
//                   >
//                     Forgot Password
//                   </Link>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default LoginContainer;

import { useState } from "react";
import Title from "../utils/Title";
import "./Tabcontainer.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginContainer = () => {
  const [activeTab, setActiveTab] = useState("tabone");

  const [individualEmail, setIndividualEmail] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");

  const [individualPassword, setIndividualPassword] = useState("");
  const [organisationPassword, setOrganisationPassword] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleTabOne = () => {
    setActiveTab("tabone");
  };
  const handleTabTwo = () => {
    setActiveTab("tabtwo");
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (!individualEmail || !individualPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = {
      email: individualEmail,
      password: individualPassword,
    };

    try {
      const response = await fetch("http://3.83.243.144/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(formData),

      });
      // console.log("response data", response);

      if (response.ok) {

        toast.success("Registration successful");
        const data = await response.json();
        const accessToken = data.access;
        const refreshToken = data.refresh;

        console.log("token",refreshToken);
        console.log("Registration successful");
        setRegistrationSuccess(true);
        // Save the access token in an HttpOnly cookie
        document.cookie = `access_token=${accessToken}; Secure; SameSite=None`;

        navigate("/translateveruser");
      } else {
        console.log("Registration failed");
        const data = await response.json();

        toast.error(data.detail);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      toast.error("An error occurred");
    }
    // try {
    //   const response = await axios.post(
    //     "http://3.83.243.144/api/v1/login",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true, // Use withCredentials to include cookies in the request
    //     }
    //   );
    
    //   console.log("response data", response);
    
    //   if (response.status === 201) {
    //     toast.success("Registration successful");
    //     // Set the Authorization header with the access token
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    //     const accessToken = response.data.token;
    //     console.log("Registration successful");
    //     setRegistrationSuccess(true);
    //     // Save the access token in an HttpOnly cookie
    //     document.cookie = `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict`;
    
    //     navigate("/translateveruser");
    //   } else {
    //     console.log("Registration failed");
    //     const data = response.data;
    //   toast.error(data.detail || "Login failed. Please check your credentials.");
  
    //   }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    //   toast.error("An error occurred. Please try again later.");
    // }
    
  };

  //admin login
  const handleSubmitAdmin = async (e) => {
    e.preventDefault();

    if (!organisationEmail || !organisationPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = {
      email: organisationEmail,
      password: organisationPassword,
    };

    try {
      const response = await axios.post(
        "http://3.83.243.144/api/v1/organization/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const accessToken = data.access_token;
        console.log("Registration successful");
        setRegistrationSuccess(true);
        // Save the access token in an HttpOnly cookie
        document.cookie = `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict`;
        navigate("/translateveruser");
        toast.success("Registration successful");
      } else {
        const data = response.data;
        toast.error(data.detail);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="p-[10px]">
      <Title />
      <div className="w-[340px] mx-auto pt-[50px]">
        <h1 className="font-[700] justify-center align-middle text-[18px] leading-4 flex w-full h-[33px] mx-auto text-center">
          Login to your account account
        </h1>
        <div className="tab-ul flex flex-col">
          <ul className="flex flex-row list-none text-center cursor-pointer justify-around font-[400] text-[13px] pb-[20px] leading-4 w-[327px] mx-auto">
            <li
              onClick={handleTabOne}
              className={`cursor-pointer rounded-full font-[600] ${
                activeTab === "tabone"
                  ? "active text-white bg-primary rounded-full"
                  : "text-dark bg-gray"
              } `}
            >
              Individual
            </li>
            <li
              onClick={handleTabTwo}
              className={`cursor-pointer rounded-full font-[600] ${
                activeTab === "tabtwo"
                  ? "active text-white bg-primary rounded-full"
                  : "text-dark bg-gray "
              } `}
            >
              Organisation
            </li>
          </ul>
          <div>
            {activeTab === "tabone" ? (
              <form
                onSubmit={handleSubmitUser}
                className="rounded-md flex flex-col content-center max-w-[448px] mx-auto p-[10px]"
              >
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none outline-none flex  h-[40px] border rounded-[15px] w-full p-[1rem] text-gray-700 leading-tight focus:outline-none "
                    id="individualemail"
                    type="text"
                    placeholder="Email"
                    required
                    value={individualEmail}
                    onChange={(e) => setIndividualEmail(e.target.value)}
                  />
                </div>
                <div className="pb-[20px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="individual_password"
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    value={individualPassword}
                    onChange={(e) => setIndividualPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button
                  className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                  type="submit"
                >
                  Log in
                </button>
                {/* <Link to="#" className="pb-[20px]">
                </Link> */}
                <div className="flex flex-col justify-center mx-auto">
                  <p className=" text-sm">
                    Sign up for an account?
                    <Link to="/signupcontainer">
                      <span className="pl-sm pr-sm text-primary">Sign Up</span>
                    </Link>
                  </p>
                  <Link
                    to="/passwordresetinvoke"
                    className="underline underline-offset-8 mx-auto"
                  >
                    Forgot Password
                  </Link>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleSubmitAdmin}
                className="rounded-md flex flex-col content-center max-w-[448px] mx-auto p-[10px]"
              >
                <div className="pb-md">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Organisation Email"
                    required
                    value={organisationEmail}
                    onChange={(e) => setOrganisationEmail(e.target.value)}
                  />
                </div>
                <div className="pb-[20px]">
                  <input
                    className="placeholder:p-md appearance-none  h-[40px] border flex  rounded-[15px] w-full p-[1rem] text-gray-700 mb-3 leading-tight focus:outline-none"
                    id="organisation_password"
                    type="password"
                    placeholder="admin Password"
                    required
                    minLength={8}
                    value={organisationPassword}
                    onChange={(e) => setOrganisationPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button
                  className="bg-primary text-white rounded-full w-full px-lg h-[40px]"
                  type="submit"
                >
                  Log in
                </button>

                <div className="flex flex-col justify-center mx-auto">
                  <p className=" text-sm">
                    Sign up for an account?
                    <Link to="/signupcontainer">
                      <span className="pl-sm pr-sm text-primary">Sign Up</span>
                    </Link>
                  </p>
                  <Link
                    to="/passwordresetinvoke"
                    className="underline underline-offset-8 mx-auto"
                  >
                    Forgot Password
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginContainer;


//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1OTM0MTg0LCJpYXQiOjE2OTUzMjkzODQsImp0aSI6IjFkYjM0NmY1NDExZDQ0MzE4YjNiOTAyODMwMzJmMGU2IiwidXNlcl9pZCI6M30.24pVWo-IkJMiftu5yUkKKpCyOiMYeL1vmLHkbPoYqpY
