import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../store/store";

const PrivateRoutes = () => {
  const userRole = useSelector((state: RootState) => state.auth.role);
  return userRole === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
