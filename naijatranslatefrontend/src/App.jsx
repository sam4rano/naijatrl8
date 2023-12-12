import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Title from "./utils/Title";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import Verify from "./auth/Verify";
import PasswordResetAdmin from "./auth/PasswordResetAdmin";
import PasswordReset from "./auth/PasswordReset";
import PasswordResetInvoke from "./auth/PasswordResetInvoke";
// import PasswordChange from "./auth/PasswordChange";
import SignupContainer from "./auth/SignupContainer";
import LoginContainer from "./auth/LoginContainer";
import CheckInbox from "./auth/CheckInbox";
import OrganisationVerify from "./auth/OrganisationVerify";
import TranslateVerUser from "./components/TranslateVerUser";
import ResendVerification from "./auth/ResendVerification";
// import History from "../pages/History";
// import Contact from "../pages/Conctact"
// import HelpCenter from "../pages/HelpCenter"
// import Feedback from "../pages/Feedback"
import History from "./pages/History";
import Feedback from "./pages/Feedback";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Title />} />
          </Route>
          <Route path="signupcontainer" element={<SignupContainer />} />
          <Route path="history" element={<History />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="help_center" element={<HelpCenter />} />
          <Route path="contact" element={<Contact />} />

          <Route path="logincontainer" element={<LoginContainer />} />
          {/* <Route path="passwordchange" element={<PasswordChange />} /> */}
          <Route path="translateveruser" element={<TranslateVerUser />} />
          <Route path="passwordresetinvoke" element={<PasswordResetInvoke />} />
          <Route path="verify-account/*" element={<Verify />} />
          <Route
            path="organization/verify-account/*"
            element={<OrganisationVerify />}
          />
          <Route path="checkinbox" element={<CheckInbox />} />
          <Route path="password-reset/*" element={<PasswordReset />} />
          <Route
            path="organisation/password-reset/*"
            element={<PasswordResetAdmin />}
          />
          <Route
            path="resendverifyaccount/*"
            element={<ResendVerification />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
