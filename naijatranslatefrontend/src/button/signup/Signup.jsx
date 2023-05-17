// import { Link } from "react-router-dom";

// const Signup = () => {
//   return (
//     <div className="text-center mb-[-80px] flex flex-row gap-[200px] max-w-[500px] mx-auto">
//       <Link to="/containersignup">
//         <button className="bg-primary text-white rounded-full px-lg h-[40px] max-w-300px">
//           Individual
//         </button>
//       </Link>
//       <Link to="/containerorgsignup">
//         <button className="bg-gray text-dark rounded-full px-lg h-[40px] max-w-300px ">
//           Organisation
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [activeButton, setActiveButton] = useState("individual");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="text-center mb-[-80px] flex flex-row gap-[200px] max-w-[500px] mx-auto">
      <Link to="/containersignup">
        <button
          className={`${
            activeButton === "individual" ? "bg-primary" : "bg-gray"
          } text-white rounded-full px-lg h-[40px] max-w-300px`}
          onClick={() => handleButtonClick("individual")}
        >
          Individual
        </button>
      </Link>
      <Link to="/containerorgsignup">
        <button
          className={`${
            activeButton === "organisation" ? "bg-primary" : "bg-gray"
          } text-white rounded-full px-lg h-[40px] max-w-300px`}
          onClick={() => handleButtonClick("organisation")}
        >
          Organisation
        </button>
      </Link>
    </div>
  );
};

export default Signup;




// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   const [isButton1Clicked, setButton1Clicked] = useState(true);
//   const [isButton2Clicked, setButton2Clicked] = useState(false);

//   const handleButton1Click = () => {
//     setButton1Clicked(true);
//     setButton2Clicked(false);
//   };

//   const handleButton2Click = () => {
//     setButton1Clicked(false);
//     setButton2Clicked(true);
//   };
  

//   return (
//     <div className="text-center mb-[-80px] flex flex-row gap-[200px] max-w-[500px] mx-auto">
//       <Link to="/containersignup">
//         <button
//           className={`bg-${
//             isButton1Clicked ? "blue" : "transparent"
//           } text-dark rounded-full px-lg h-[40px] max-w-300px`}
//           onClick={handleButton1Click}
//         >
//           Individual
//         </button>
//       </Link>
//       <Link to="/containerorgsignup">
//         <button
//           className={`bg-${
//             isButton2Clicked ? "blue" : "transparent"
//           } text-dark rounded-full px-lg h-[40px] max-w-300px`}
//           onClick={handleButton2Click}
//         >
//           Organisation
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Signup;

