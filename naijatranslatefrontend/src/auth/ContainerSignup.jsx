

import Signup from "../button/signup/Signup";
import Title from "../components/Title";
import InSignup from "./InSignup";

const ContainerSignup = () => {
  return (
    <main className="w-full mx-auto justify-center align-middle p-sm">
      <div className="flex flex-row justify-start">
        <Title />
      </div>
      <div className="flex flex-col mt-lg">
        <h1 className="text-dark text-center mt-lg pb-md font-bold">Sign up for your free account</h1>
        <Signup />
        <InSignup />
        
      </div>
    </main>
  );
};

export default ContainerSignup;
