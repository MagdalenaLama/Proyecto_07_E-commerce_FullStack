import { getUserRole } from "../services/userApi";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const userRole = getUserRole();

  if (userRole !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};
