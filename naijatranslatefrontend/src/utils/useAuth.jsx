import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useAuth = () => {
  const getAccessTokenFromCookie = useCallback(async () => {
    try {
      const accessToken = await Cookies.get('access_token');
      return accessToken || 'unauthenticated user';
    } catch (error) {
      console.error('Error while fetching access token:', error);
      toast.error('Error fetching access token: ' + error.message);
      return 'unauthenticated user';
    }
  }, []);

  const handleAccessToken = useCallback(async () => {
    let accessToken = '';
    try {
      accessToken = await getAccessTokenFromCookie();
      if (!accessToken || accessToken === 'unauthenticated user') {
        toast.error('No access token found. Please log in.');
        return null;
      }
      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      toast.error('Error fetching access token: ' + error.message);
      return null;
    }
  }, [getAccessTokenFromCookie]);

  return handleAccessToken;
};
