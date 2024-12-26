import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/User/Home/Home";
import PublicMap from "./pages/User/PublicMap/PublicMap";
import MapManagement from "./pages/User/MapManagement/MapManagement";
import MyLibrary from "./pages/User/MyLibrary/MyLibrary";
import Profile from "./pages/User/Profile/Profile";
import { PageEnum, AdminPageEnum } from "./defination/enums/page.enum";
import PrivateRoute from "./components/Common/PrivateRoute";
import AuthLogin from "./pages/User/Auth/AuthLogin";
import AuthSignUp from "./pages/User/Auth/AuthSignUp";
import AuthForgotPass from "./pages/User/Auth/AuthForgotPass";
import AuthVerifyEmail from "./pages/User/Auth/AuthVerifyEmail";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import UsersManagement from "./pages/Admin/Users/UsersManagement";
import TechniciansManagement from "./pages/Admin/Technicians/TechniciansManagement";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path={PageEnum.LOGIN} element={<AuthLogin />} />
        <Route path={PageEnum.SIGN_UP} element={<AuthSignUp />} />
        <Route path={PageEnum.VERIFY} element={<AuthVerifyEmail />} />
        <Route path={PageEnum.FORGOT_PASSWORD} element={<AuthForgotPass />} />

        {/* PUBLIC ROUTES */}
        <Route path={PageEnum.INDEX} element={<Navigate to={PageEnum.HOME} replace />} />
        <Route path={PageEnum.HOME} element={<Home />} />
        <Route path={PageEnum.PUBLIC_MAP} element={<PublicMap />} />
        <Route path={PageEnum.NOT_FOUND} element={<NotFound />} />

        USER ROUTES
        <Route
          path={PageEnum.PROFILE}
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PageEnum.MAPMANAGEMENT}
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <MapManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={PageEnum.LIBRARY}
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <MyLibrary />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path={AdminPageEnum.DASHBOARD}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={AdminPageEnum.USER_MANAGEMENT}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UsersManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={AdminPageEnum.TECHNICIAN_MANAGEMENT}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <TechniciansManagement />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
