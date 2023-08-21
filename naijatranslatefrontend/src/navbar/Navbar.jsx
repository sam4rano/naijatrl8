import { useState } from "react";
import { Link} from "react-router-dom";
import Title from "../utils/Title"


const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
  return (
    <div className="h-[70px] p-lg flex flex-row justify-between">
      <div className="flex flex-row gap-sm">
        <div
          className=" text-dark focus:border-gray-400 cursor-pointer"
          onClick={() => setNavbar(!navbar)}
        >
          {navbar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-lg h-lg text-dark"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-lg h-lg text-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </div>
        <Title />
      </div>
      <div className="flex flex-row justify-around gap-sm">
        <Link to="/signupcontainer">
          <button className="bg-primary text-white rounded-full px-lg h-[30px]">
            Sign up
          </button>
        </Link>
        
        <Link to="/logincontainer">
          <button className=" text-primary outline outline-offset-0  rounded-full px-lg h-[30px] outline-1">
            Login
          </button>
        </Link>
        
        <div className="h-[30px] w-[30px] bg-primary rounded-full"></div>
      </div>
    </div>

  );
};

export default Navbar;
// import { Link } from "react-router-dom";
// import Title from "../components/Title";

// const Navbar = () => {
//   const [navbarOpen, setNavbarOpen] = useState(false);

//   const toggleNavbar = () => {
//     setNavbarOpen(!navbarOpen);
//   };

//   return (
//     <div className="navbar h-16 px-4 flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         <div
//           className="text-dark cursor-pointer"
//           onClick={toggleNavbar}
//         >
//           {navbarOpen ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6 text-dark"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6 text-dark"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </div>
//         <Title />
//       </div>
//       <div className="flex items-center gap-2">
//         <Link to="/containersignup">
//           <button className="btn-primary">Sign up</button>
//         </Link>
//         <Link to="/organisation">
//           <button className="btn-primary-outline">Login</button>
//         </Link>
//         <div className="rounded-full w-8 h-8 bg-primary"></div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
