import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginAdmin from "./pages/LoginAdmin";
import Mainfile from "./pages/Mainfile";
import LoginUser from "./pages/LoginUser";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/spark-form" element={<Mainfile />} />
        <Route path="/" element={<LoginUser />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
