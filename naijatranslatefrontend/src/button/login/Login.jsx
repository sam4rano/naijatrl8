

import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [activeButton, setActiveButton] = useState("individual");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="text-center mb-[-80px] flex flex-row gap-[100px] max-w-[500px] mx-auto">
      <Link to="/containerindlogin">
        <button
          className={`${
            activeButton === "individual" ? "bg-primary" : "bg-gray"
          } text-white rounded-full px-lg h-[40px] max-w-300px`}
          onClick={() => handleButtonClick("individual")}
        >
          Individual
        </button>
      </Link>
      <Link to="/containerorglogin">
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

export default Login;
