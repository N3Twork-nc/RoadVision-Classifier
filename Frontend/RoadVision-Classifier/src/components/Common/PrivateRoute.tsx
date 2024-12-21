// components/PrivateRoute.tsx Private route use for user who already have an account can access.
import React from "react";
import useInitializeUser from "../../hooks/useInitializeUser";
import { getAccessToken, handleLogOut } from "../../utils/auth.util";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const accessToken = getAccessToken();

  React.useEffect(() => {
    if (!accessToken) {
      handleLogOut();
    }
  }, [accessToken]);

  if (!accessToken) {
    return null;
  }

  useInitializeUser();
  return children;
};

export default PrivateRoute;
