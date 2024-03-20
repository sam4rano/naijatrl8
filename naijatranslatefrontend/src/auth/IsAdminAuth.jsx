import { Outlet } from "react-router-dom";

const IsAdminAuth = () => {
  const isAdminValue = localStorage.getItem("isAdmin");

  return isAdminValue ? (
    <Outlet />
  ) : (
    <div>
      <h2>Return to Homepage</h2>
    </div>
  );
};

export default IsAdminAuth;
