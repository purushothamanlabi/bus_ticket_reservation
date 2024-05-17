import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"; //
import LoginAD from "./admin/Login";
import LoginUS from "./component/login";
import Verify from "./component/Verify";
import End from "./component/end";
import Dashboard from "./admin/Dashbord.jsx";
import Home from "./component/home.jsx";
import Profile from "./component/profile.jsx";
import Payment from "./component/payment.jsx";
import Register from "./component/register.jsx";

const app = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<LoginUS />} />

          <Route path="/home" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/end" element={<End />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify" element={<Verify />} />

          <Route path="/userlogin" element={<LoginUS />} />
          <Route path="/useregister" element={<Register />} />
          <Route path="/adminlogin" element={<LoginAD />} />
        </Routes>
      </Router>
    </>
  );
};

export default app;
