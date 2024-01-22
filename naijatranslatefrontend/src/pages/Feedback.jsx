import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavVerified from "../navbar/NavVerified";

const Feedback = () => {
  return (
    <>
      <NavVerified />
      <div className="flex justify-center flex-col px-[40px] py-[30px] bg-[#f0f0f0]">
        <div className="bg-white p-[20px]">
          <div className="flex flex-row justify-start px-[10px] py-[20px]">
            <h2 className=" text-[20px] font-bold">Feedback</h2>
          </div>
          <div className="py-[10px]">
            <hr className="" />
            <div className="flex flex-row justify-end p-[10px]">
              <h2 className=" text-[16px] ">Clear all Feedback</h2>
            </div>
            <hr className="" />
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Feedback;
