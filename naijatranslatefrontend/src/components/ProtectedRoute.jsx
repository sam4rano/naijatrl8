import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const accessToken = Cookies.get("access_token");
  return accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
