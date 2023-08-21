import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Title from "./utils/Title";
import Verify from "./auth/Verify";

// import ContainerLogin from "./auth/ContainerIndlogin";
import PasswordReset from "./auth/PasswordReset";
import PasswordChange from "./auth/PasswordChange"
// import ContainerIndSignup from "./auth/ContainerindSignup"
import SignupContainer from "./auth/SignupContainer";
import LoginContainer from "./auth/LoginContainer";
import CheckInbox from "./auth/CheckInbox";
import OrganisationVerify from "./auth/OrganisationVerify";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Title />} />
          </Route>
          <Route path="signupcontainer" element={<SignupContainer />} />
          
          <Route path="logincontainer" element={<LoginContainer />} />
          <Route path="passwordchange" element={<PasswordChange />} />
          <Route path="passwordreset" element={<PasswordReset />} />
          <Route path="verify-account/*" element={<Verify />} />
          <Route path="organization/verify-account" element={<OrganisationVerify />} />
          <Route path="checkinbox" element={<CheckInbox />} />
        
        </Routes>
      </Router>
    </>
  );
}
