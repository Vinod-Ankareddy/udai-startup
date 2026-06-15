import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import OTPLogin from "../pages/OTPLogin/OTPLogin";
import Dashboard from "../pages/Dashboard/Dashboard";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/otpLogin" element={<OTPLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default AppRoutes;