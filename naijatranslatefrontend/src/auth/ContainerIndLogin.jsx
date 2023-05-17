
import Title from "../components/Title";
import IndLogin from "./IndLogin";

const ContainerLogin = () => {
  return (
    <main className="w-full mx-auto justify-center align-middle p-sm">
      <div className="flex flex-row justify-start">
        <Title />
      </div>
      <div className="flex flex-col mt-lg">
        <h1 className="text-dark text-center mt-lg pb-md font-bold">
          Login to your account
        </h1>
        
        <IndLogin />
      </div>
    </main>
  );
};

export default ContainerLogin;
