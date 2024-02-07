import AddEmployee from "./AddEmployee";

import EmployeeList from "./EmployeeList";

const DashboardAdmin = () => {
  return (
    <div className="w-full p-[10px] flex flex-col justify-center items-center align-middle gap-[10px]">
      <div className="flex w-full h-[100px] bg-white rounded-[10px] p-[5px]">
        <div>Admin profile</div>
      </div>
      <div className="flex p-[10px] bg-white w-full rounded-[10px] flex-col align-middle justify-center items-center gap-[10px]">
        <div className="font-normal leading-[30px] text-[16px]">Manage Employee</div>

        <div className="flex flex-row justify-center align-middle items-center w-full">
          <div className="text-[14px] border-dashed min-w-[200px] h-[70px] border-2 border-slate-500 flex justify-center align-middle items-center rounded-lg hover:bg-blue-100 font-normal text-center  p-[10px]  mr-[5px]">
            <h3>employees</h3>
          </div>
          <AddEmployee />
          <div className="text-[14px] border-dashed min-w-[200px] h-[70px] border-2 border-slate-500 flex justify-center align-middle items-center rounded-lg hover:bg-blue-100 font-normal text-center  p-[10px]  mr-[5px]">
            <button>Remove Employee</button>
          </div>
        </div>
      </div>

      <EmployeeList />
    </div>
  );
};

export default DashboardAdmin;
