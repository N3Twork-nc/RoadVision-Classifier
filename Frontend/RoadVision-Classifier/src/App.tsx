import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/User/Auth/Auth";
import ForgotPass from "./pages/User/ForgotPass/ForgotPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/forgot-pass" element={<ForgotPass />} />        
      </Routes>
    </BrowserRouter>
  );
}
export default App;