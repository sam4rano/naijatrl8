

import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Title from "./utils/Title";

// import InSignup from "./auth/InSignup";
import Login from "./button/login/Login";
import SignUp from "./button/signup/Signup";

import OrgSignup from "./auth/OrgSignUp";
import ContainerSignup from "./auth/ContainerSignup";
import ContainerOrgSignup from "./auth/ContainerOrgSignUp";
import ContainerOrgLogin from "./auth/ContainerOrgLogin";
import ContainerLogin from "./auth/ContainerIndlogin";
import PasswordReset from "./auth/PasswordReset";

import SignUpUser from "./components/SignupUser/SignUpUser";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Title />} />
          </Route>
          <Route path="individual" element={<Login />}></Route>
          <Route path="organisation" element={<SignUp />} />

          <Route path="orgsignup" element={<OrgSignup />} />
          <Route path="containersignup" element={<ContainerSignup />} />
          <Route path="containerorgsignup" element={<ContainerOrgSignup />} />
          <Route path="containerorglogin" element={<ContainerOrgLogin />} />
          <Route path="containerindlogin" element={<ContainerLogin />} />
          <Route path="signinuser" element={<SignUpUser />} />
          <Route path="passwordreset" element={<PasswordReset />} />
        </Routes>
      </Router>
    </>
  );
}
