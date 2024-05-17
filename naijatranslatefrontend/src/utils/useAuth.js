import { useCallback } from "react";
import { toast } from "react-toastify";
import { getAccessTokenFromCookie } from "./tokenUtils";

export const useHandleAccessToken = () => {
  const handleAccessToken = useCallback(async () => {
    let accessToken = "";
    try {
      accessToken = await getAccessTokenFromCookie();
      if (!accessToken || accessToken === "unauthenticated user") {
        toast.error("No access token found. Please log in.");
        return null;
      }
      return accessToken;
    } catch (error) {
      toast.error("Error fetching access token: " + error.message);
      return null;
    }
  }, []);

  return handleAccessToken;
};
