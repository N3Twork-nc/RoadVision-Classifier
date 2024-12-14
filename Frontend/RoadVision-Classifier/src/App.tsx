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
import Auth from "./pages/User/Auth/Auth";
import EnterEmail from "./components/ForgotPass/EnterEmail";
import Profile from "./pages/User/Profile/Profile";
import { PageEnum } from "./defination/enums/page.enum";
import PrivateRoute from "./components/Common/PrivateRoute";
// import ReactQuery from "./components/ReactQuery";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path={PageEnum.LOGIN} element={<Auth />} />
        <Route path={PageEnum.SIGN_UP} element={<Auth />} />
        {/* <Route path={PageEnum.VERIFY} element={<Auth />} /> */}
        <Route path={PageEnum.FORGOT_PASSWORD} element={<EnterEmail />} />
        {/* END AUTH ROUTES *

        {/* PUBLIC ROUTES */}
        <Route
          path={PageEnum.INDEX}
          element={<Navigate to={PageEnum.HOME} replace />}
        />
        <Route path={PageEnum.HOME} element={<Home />} />
        <Route path={PageEnum.PUBLIC_MAP} element={<PublicMap />} />
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
