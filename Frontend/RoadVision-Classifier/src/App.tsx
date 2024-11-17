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
