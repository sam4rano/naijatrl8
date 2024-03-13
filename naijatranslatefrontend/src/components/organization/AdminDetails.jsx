import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../api/SpeechApi";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const AdminDetails = () => {
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
  };

  const adminDetails = async () => {
    try {
      const headers = await getCommonHeaders();

      const response = await axios.get(`${baseURL}/organization/auth-details`, {
        headers: headers,
      });

      return response.data.data;
    } catch (error) {
      console.error("Error in admin details:", error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin_details"],
    queryFn: adminDetails,
  });
  console.log("user profile", data);
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

  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>AdminProfile</h1>
      <div>{data}</div>
      <ToastContainer />
    </div>
  );
};

export default AdminDetails;
