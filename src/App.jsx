import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/home/Home";
import { Login } from "./components/Login";
import Signup from "./components/Signup";
import Verification from "./components/Verification";
import Dashboard from "./components/Dashboard";
import PasswordReset from "./components/PasswordReset";
import SetNewPassword from "./components/SetNewPassword";
import TokenCheck from "./components/TokenCheck";
import FlockDetails from "./components/FlockDetails";
import AddFlock from "./components/AddFlock";
import AddWeightRecord from "./components/AddWeightRecord";
import EditWeightRecord from "./components/EditWeightRecord";
import Health from "./components/Health";
import EditHealthRecord from "./components/EditHealthRecord";
import Feed from "./components/Feed";
import EditFeedingRecord from "./components/EditFeedingRecord";
import Account from "./components/Account";
import EditAccount from "./components/EditAccount";
import Document from "./components/Document";

function App() {
  return (
    <>
      {/* <Home /> */}
      <BrowserRouter>
        {" "}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/token-check/:uidb64/:token/:mailType"
            element={<TokenCheck />}
          />
          <Route
            path="/set-new-password/:uidb64/:token"
            element={<SetNewPassword />}
          />
          <Route path="/flock-details/:flockId" element={<FlockDetails />} />
          <Route
            path="/add-weight-record/:flockId"
            element={<AddWeightRecord />}
          />
          <Route
            path="/edit-weight-record/:flockId/:weightId"
            element={<EditWeightRecord />}
          />
          <Route
            path="/edit-health-record/:flockId/:medicationId"
            element={<EditHealthRecord />}
          />
          <Route
            path="/edit-feed-record/:flockId/:feedingId"
            element={<EditFeedingRecord />}
          />
          <Route path="/feed/:flockId" element={<Feed />} />
          <Route path="/health/:flockId" element={<Health />} />
          <Route path="/add-flock" element={<AddFlock />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/account" element={<Account />} />
          <Route path="/document" element={<Document />} />
          <Route path="/edit-account/:recordId" element={<EditAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
