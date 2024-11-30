import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home/Home";
import PublicMap from "./pages/User/PublicMap/PublicMap";
import MapManagement from "./pages/User/MapManagement/MapManagement";
import MyLibrary from "./pages/User/MyLibrary/MyLibrary";
import Auth from "./pages/User/Auth/Auth";
import EnterEmail from "./components/ForgotPass/EnterEmail";
import Profile from "./pages/User/Profile/Profile";
// import ReactQuery from "./components/ReactQuery";

const App: React.FC = () => {

  const onContinue = () => {}
  return ( 
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/sign-up" element={<Auth />} />
        <Route path="/forgot-password" element={<EnterEmail onContinue={onContinue} />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/public-map" element={<PublicMap />} />
        <Route path="/map-management" element={<MapManagement />} />
        <Route path="/library" element={<MyLibrary />} />
      </Routes>
    </Router>
  );
};

export default App;
