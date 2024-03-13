import AddEmployee from "./AddEmployee";
import { useEmployeeDataStore } from "../../Stores/DataStore";

import EmployeeList from "./EmployeeList";
import RemoveEmployee from "./RemoveEmployee";
import AdminDetails from "./AdminDetails";


const DashboardAdmin = () => {
  const { employeeData } = useEmployeeDataStore();

  console.log("employee data", employeeData.length);
  return (
    <div className="w-full p-[10px] flex flex-col justify-center items-center align-middle gap-[10px] flex-wrap">
      <div className="flex w-full h-[100px] bg-white rounded-[10px] p-[5px]">
        <AdminDetails />
      </div>
      <div className="flex p-[10px] bg-white w-full rounded-[10px] flex-col align-middle justify-center items-center gap-[10px]">
        <div className="font-semibold leading-[30px] text-[16px]">
          Manage Employee
        </div>

        <div className="flex flex-row justify-center align-middle items-center w-full flex-wrap sm:gap-[20px] md:gap-[20px]">
          <div className="text-[14px]  min-w-[200px] h-[70px] flex justify-center align-middle flex-col items-center rounded-lg hover:bg-blue-100 font-normal text-center  p-[10px]  mr-[5px]">
            <h1 className="font-bold leading-[30px] text-[20px]">
              {employeeData.length}
            </h1>
            <p>employees</p>
          </div>
          <AddEmployee />
          <RemoveEmployee />
        </div>
      </div>

      <EmployeeList />
    </div>
  );
};

export default DashboardAdmin;
