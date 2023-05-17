import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="text-center mb-[-80px] flex flex-row gap-[200px] max-w-[500px] mx-auto">
      <Link to="/indsignup">
        <button className="bg-primary text-white rounded-full px-lg h-[40px] max-w-300px">
          Individual
        </button>
      </Link>
      <Link to="/orgsignup">
        <button className="bg-gray text-dark rounded-full px-lg h-[40px] max-w-300px">
          Organisation
        </button>
      </Link>
    </div>
  );
};

export default Signup;
