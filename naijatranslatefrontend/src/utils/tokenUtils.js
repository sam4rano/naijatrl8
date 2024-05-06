import Cookies from 'js-cookie';
import { toast } from 'react-toastify';  
export const getAccessTokenFromCookie = async () => {
  try {
    const accessToken = await Cookies.get("access_token");
    return accessToken || "unauthenticated user";
  } catch (error) {
    console.error("Error while fetching access token:", error);
    toast.error("Error fetching access token: " + error.message);
    return "unauthenticated user";
  }
};
