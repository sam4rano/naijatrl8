import AddEmployee from "./AddEmployee";
import { useEmployeeDataStore } from "../../Stores/DataStore";
import { useAdminDataStore } from "../../Stores/AdminStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../api/SpeechApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";

import EmployeeList from "./EmployeeList";
import RemoveEmployee from "./RemoveEmployee";
import AdminDetails from "./AdminDetails";

const DashboardAdmin = () => {
  const { employeeData } = useEmployeeDataStore();
  const { setAdminProfile } = useAdminDataStore();

  const getAccessTokenFromCookie = useCallback(async () => {
    try {
      const accessToken = Cookies.get("access_token");

      return accessToken || "unauthenticated user";
    } catch (error) {
      console.error("Error during mutation:", error);
      console.error("Response data:", error.response?.data);

      toast.error("Error submitting data: " + error.message);
      return "unauthenticated user";
    }
  }, []);

  const getCommonHeaders = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenFromCookie();

      const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      };

      return commonHeaders;
    } catch (error) {
      console.error("Error in getCommonHeaders:", error);
      throw error;
    }
  }, [getAccessTokenFromCookie]);

  const AdminData = useCallback(async () => {
    try {
      const headers = await getCommonHeaders(); // Await here

      const response = await axios.get(`${baseURL}/organization/auth-details`, {
        headers: headers,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in userData:", error);
      throw error;
    }
  }, [getCommonHeaders]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin_data"],
    queryFn: AdminData,
  });

  useEffect(() => {
    if (data) {
      setAdminProfile(data);
    }
  }, [data, setAdminProfile]);

  if (isLoading) {
    return (
      <div className="text-center text-[20px] font-normal">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-[30px] font-bold">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full p-[10px] flex flex-col justify-center items-center align-middle gap-[10px] flex-wrap">
      <div className="flex w-full h-[100px] bg-white rounded-[10px] p-[5px]">
        <AdminDetails AdminData={data} />
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
