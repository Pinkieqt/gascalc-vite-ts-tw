import React, { FC } from "react";

interface PropType {
  component: React.FC;
}

const ProtectedRoute: FC<PropType> = ({ component: Component }) => {
  return <Component />;
};

export default ProtectedRoute;
