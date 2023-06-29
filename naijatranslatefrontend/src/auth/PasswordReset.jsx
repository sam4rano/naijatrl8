import { Link } from "react-router-dom";
import Title from "../utils/Title";

const PasswordReset = () => {
  return (
    <div className="flex flex-col">
      <Title />
      <form className="rounded-md flex flex-col content-center max-w-[500px] mx-auto mt-[100px] p-md">
        <div className="pb-md">
          <input
            className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded w-full p-[1rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Login In
          </button>
        </div>
        <Link to="" className="">
          <button className="bg-primary text-white rounded-full w-full px-lg h-[40px]">
            Submit
          </button>
        </Link>
        <div className="flex flex-col p-[10px] justify-center mx-auto">
          <h1></h1>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
