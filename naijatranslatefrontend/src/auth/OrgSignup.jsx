import Checkbox from "../components/Checkbox";
import Title from "../components/Title";
import LogInfo from "./LogInfo";

const OrgSignup = () => {
  return (
    <form className="rounded-md flex flex-col content-center max-w-[500px] mx-auto mt-[100px] p-md">
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none border-gray-500 flex h-[40px] border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Organisation name"
        />
      </div>
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none flex  h-[40px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Organisation Email"
        />
      </div>
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none  h-[40px] border flex  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="pb-md">
        <input
          className="shadow placeholder:p-md appearance-none flex  h-[40px] border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="confirm password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
      </div>
      <div>
        <Checkbox />
      </div>
      <div className="">
        <button className="bg-primary text-white rounded-full px-lg h-[40px] w-full">
          Submit
        </button>
      </div>
      <p className=" text-sm">
        By signing in, you agree that you have read and understood, and agree to
        <span className="pl-sm pr-sm">
          <Title />
        </span>
        Terms of Service and Privacy Policy of Service
      </p>
      <div>
        <LogInfo />
      </div>
    </form>
  );
};

export default OrgSignup;
