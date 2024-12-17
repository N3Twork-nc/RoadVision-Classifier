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
import { PageEnum } from "./defination/enums/page.enum";
import PrivateRoute from "./components/Common/PrivateRoute";
import AuthLogin from "./pages/User/Auth/AuthLogin";
import AuthSignUp from "./pages/User/Auth/AuthSignUp";
import AuthForgotPass from "./pages/User/Auth/AuthForgotPass";
import AuthVerifyEmail from "./pages/User/Auth/AuthVerifyEmail";
import NotFound from "./pages/NotFound/NotFound";
// import ReactQuery from "./components/ReactQuery";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path={PageEnum.LOGIN} element={<AuthLogin />} />
        <Route path={PageEnum.SIGN_UP} element={<AuthSignUp />} />
        <Route path={PageEnum.VERIFY} element={<AuthVerifyEmail />} />
        <Route path={PageEnum.FORGOT_PASSWORD} element={<AuthForgotPass />} />
        {/* END AUTH ROUTES *

        {/* PUBLIC ROUTES */}
        <Route
          path={PageEnum.INDEX}
          element={<Navigate to={PageEnum.HOME} replace />}
        />
        <Route path={PageEnum.HOME} element={<Home />} />
        <Route path={PageEnum.PUBLIC_MAP} element={<PublicMap />} />
        <Route path={PageEnum.NOT_FOUND} element={<NotFound />} />

        {/* END PUBLIC ROUTES */}

        <Route
          path={PageEnum.PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PageEnum.MAPMANAGEMENT}
          element={
            <PrivateRoute>
              <MapManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={PageEnum.LIBRARY}
          element={
            <PrivateRoute>
              <MyLibrary />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
