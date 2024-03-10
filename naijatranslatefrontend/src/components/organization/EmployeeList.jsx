import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useEmployeeDataStore } from "../../Stores/DataStore";

import { baseURL } from "../../api/SpeechApi";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const EmployeeList = () => {
  const { setEmployeeData } = useEmployeeDataStore();

  const getAccessTokenFromCookie = async () => {
    try {
      const accessToken = Cookies.get("access_token");

      return accessToken || "unauthenticated user";
    } catch (error) {
      console.error("Error during mutation:", error);
      console.error("Response data:", error.response?.data);

      toast.error("Error submitting data: " + error.message);
      return "unauthenticated user";
    }
  };

  const getCommonHeaders = async () => {
    try {
      const accessToken = await getAccessTokenFromCookie(); // Await here

      const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      };

      return commonHeaders;
    } catch (error) {
      console.error("Error in getCommonHeaders:", error);
      throw error;
    }
  };

  const userData = async () => {
    try {
      const headers = await getCommonHeaders(); // Await here

      const response = await axios.get(`${baseURL}/organization/users`, {
        headers: headers,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in userData:", error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employee_list"],
    queryFn: userData,
  });

  useEffect(() => {
    if (data) {
      setEmployeeData(data);
    }
  }, [data, setEmployeeData]);

  if (isLoading) {
    return (
      <div className="text center text-[10px] font-normal">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="text center text-[30px] font-bold">
        Error: {error.message}
      </div>
    );
  }

  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-white w-full rounded-[10px]">
      <h1 className="text-center ">Employee List</h1>
      <div className="w-full h-auto">
        <table className="min-w-full divide-y divide-slate-200 divide-solid">
          <thead className="bg-gray-50">
            <tr
              scope="col"
              className="px-2 py-2 text-xs font-semibold text-left text-gray-500 uppercase "
            >
              <th
                scope="col"
                className="px-2 py-2 text-xs font-semibold text-left text-gray-500 uppercase "
              >
                Id
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-xs font-semibold text-left text-gray-500 uppercase "
              >
                Email
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-xs font-semibold text-left text-gray-500 uppercase "
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-xs font-semibold text-left text-gray-500 uppercase "
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-xs font-semibold text-left text-gray-500 uppercase "
              >
                is_verified
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-2 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {item.id}
                </td>
                <td className="px-2 py-2 text-sm text-gray-800 whitespace-nowrap">
                  {item.email}
                </td>
                <td className="px-2 py-2 text-sm text-gray-800 whitespace-nowrap">
                  {item.first_name}
                </td>
                <td className="px-2 py-2 text-sm text-gray-800 whitespace-nowrap">
                  {item.last_name}
                </td>
                <td className="px-2 py-2 text-sm text-gray-800 whitespace-nowrap">
                  {item.is_verified}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;
