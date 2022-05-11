import React, { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthListener } from "./AuthListener";

interface PropType {
  component: React.FC;
}

const ProtectedRoute: FC<PropType> = ({ component: Component }) => {
  const { loggedIn, checkingStatus } = useAuthListener();

  return checkingStatus ? (
    <div>Loading</div>
  ) : loggedIn ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
