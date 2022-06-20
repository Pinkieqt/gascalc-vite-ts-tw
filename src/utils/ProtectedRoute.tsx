import React, { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { useAuthListener } from "./AuthListener";

interface PropType {
  component: React.FC;
}

const ProtectedRoute: FC<PropType> = ({ component: Component }) => {
  const { loggedIn, checkingStatus } = useAuthListener();

  return checkingStatus ? (
    <Loading />
  ) : loggedIn ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
