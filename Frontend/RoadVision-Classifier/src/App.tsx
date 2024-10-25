import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/User/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />        
      </Routes>
    </BrowserRouter>
  );
}
export default App;