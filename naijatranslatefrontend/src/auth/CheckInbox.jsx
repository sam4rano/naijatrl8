import { Link } from "react-router-dom";
import Title from "../utils/Title";

const CheckInbox = () => {
  return (
    <div className="p-[20px] ">
      <Title />
      <div className="mx-auto mt-[100px] p-[10px] w-[320px] border rounded-xl border-primary">
        <h1 className="text-center py-[20px]">
          Please Check your email for verification link
        </h1>

        <div className="flex flex-col">
          <h1 className="pb-[10px] text-center">Verification not received?</h1>
          <div className="flex flex-row w-[200px] mx-auto">
          <Link to="/resendverification" className="bg-primary p-[10px] text-white rounded-full hover:bg-transparent text-center">
            <span className="rounded-[10px]">
              Request new verification Link
            </span>
          </Link>
          <Link to="/logincontainer" className="bg-primary p-[10px] text-white rounded-full hover:bg-transparent text-center">
            <span className="rounded-[10px]">
              Login
            </span>
          </Link>

          </div>
         

        </div>
      </div>
    </div>
  );
};

export default CheckInbox;
