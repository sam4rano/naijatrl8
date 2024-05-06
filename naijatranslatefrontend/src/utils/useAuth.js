import { useCallback } from 'react';
import { toast } from 'react-toastify';  // Assuming you're using react-toastify for toasts
import { getAccessTokenFromCookie } from "./tokenUtils";  // Update path as necessary

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
			console.error("Error fetching access token:", error);
			toast.error("Error fetching access token: " + error.message);
			return null;
		}
	}, []);

	return handleAccessToken;
};
