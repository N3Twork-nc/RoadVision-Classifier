
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sider from "./components/Sider/Sider";
import Home from "./pages/User/Home/Home";
import Header from "./components/Header/Header";
import PublicMap from "./pages/User/PublicMap/PublicMap";
import MapManagement from "./pages/User/MapManagement/MapManagement";
import MyLibrary from "./pages/User/MyLibrary/MyLibrary";
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sider />
        <div className="flex-1 flex flex-col">
          {/* header */}
          <div className="sticky top-0 z-10">
            <Header />
          </div>
          {/* component */}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/public-map" element={<PublicMap />} />
              <Route path="/map-management" element={<MapManagement />} />
              <Route path="/library" element={<MyLibrary />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./pages/User/Auth/Auth";
import ForgotPass from "./pages/User/ForgotPass/ForgotPass";
import store from "../../RoadVision-Classifier/src/components/Auth/store"; // Import your Redux store
import PublicMap from "./pages/User/PublicMap/PublicMap";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/public-map" element={<PublicMap />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
