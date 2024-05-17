import { Outlet } from "react-router-dom";

import Desktop from "../auth/Desktop";
import Mobile from "../auth/Mobile";

const UserContainer = () => {
  return (
    <div className="h-screen flex md:flex-row lg:flex-row xl:flex-row sm:flex-col">
      <div className="w-[40%]">
        <div className="md:hidden lg:hidden xl:hidden">
          <Mobile />
        </div>
        <div className="sm:hidden">
          <Desktop />
        </div>
      </div>
      <div className="sm:pt-[30px] pt-[50px]">
        <Outlet />
      </div>
    </div>
  );
};

export default UserContainer;
