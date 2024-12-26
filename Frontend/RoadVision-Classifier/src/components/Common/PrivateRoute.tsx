// components/PrivateRoute.tsx Private route use for user who already have an account can access.
import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atoms/authState";
import useInitializeUser from "../../hooks/useInitializeUser";
import { getAccessToken, handleLogOut } from "../../utils/auth.util";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const accessToken = getAccessToken();
  const account = useRecoilValue(accountState).role ||"";

  React.useEffect(() => {
    if (!accessToken) {
      handleLogOut();
    }
  }, [accessToken]);

  if (!accessToken) {
    return null;
  }
  if (!allowedRoles.includes(account)) {
    return <Navigate to="/not-authorized" replace />; // Redirect if role is not allowed
  }
  useInitializeUser();
  return <>{children}</>;
};

export default PrivateRoute;
