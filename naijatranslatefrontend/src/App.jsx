

import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Title from "./components/Title";

// import { NoMatch } from "../inbox/no-match";
import "./index.css";
import OrgLogin from "./auth/OrgLogin";
// import IndLogin from "./auth/IndLogin";
// import InSignup from "./auth/InSignup";
// import InSignup from "./auth/InSignup";

// import Login from "./auth/Login";
// import IndividualSignup from "./button/signup/Signup";
// import OrganisationSignup from "./button/signup/OrganisationSignup";

// import InSignup from "./auth/InSignup";
import Login from "./button/login/Login";
import SignUp from "./button/signup/Signup";
import Container from "./auth/Container";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Title />} />
          </Route>
          <Route path="individual" element={<Login />} >
             
          </Route>
          <Route path="organisation" element={<SignUp />} />
          
          <Route path="orglogin" element={<OrgLogin />} />
          <Route path="container" element={<Container />} />
        </Routes>
      </Router>
    </>
  );
}
