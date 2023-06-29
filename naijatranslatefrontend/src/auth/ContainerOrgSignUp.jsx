import Signup from "../button/signup/Signup";
import Title from "../utils/Title";
import OrgSignup from "./OrgSignUp";

const ContainerOrgSignup = () => {
  return (
    <main className="w-full mx-auto justify-center align-middle p-sm">
      <div className="flex flex-row justify-start">
        <Title />
      </div>
      <div className="flex flex-col mt-lg">
        <h1 className="text-dark text-center mt-lg pb-md text-[30px] font-[400] ">
          Sign up for your free account
        </h1>
        <Signup />
        <OrgSignup />
      </div>
    </main>
  );
};

export default ContainerOrgSignup;
