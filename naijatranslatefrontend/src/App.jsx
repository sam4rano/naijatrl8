import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Title from "./utils/Title";



import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import Verify from "./auth/Verify";
import PasswordResetAdmin from "./auth/PasswordResetAdmin";
import PasswordReset from "./auth/PasswordReset";
import ForgotPassword from "./auth/ForgotPassword";

import SignupContainer from "./auth/SignupContainer";
import LoginContainer from "./auth/LoginContainer";
import CheckInbox from "./auth/CheckInbox";
import OrganisationVerify from "./auth/OrganisationVerify";
import TranslateVerUser from "./components/TranslateVerUser";
import ResendVerification from "./auth/ResendVerification";
import Feedback from "./pages/Feedback";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import InternalHistory from "./utils/userHistory";

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

          <Route path="feedback" element={<Feedback />} />
          <Route path="help_center" element={<HelpCenter />} />
          <Route path="contact" element={<Contact />} />
          <Route path="internalhistory" element={<InternalHistory />} />
          <Route path="logincontainer" element={<LoginContainer />} />

          <Route path="translateveruser" element={<TranslateVerUser />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="verify-account/*" element={<Verify />} />
          <Route
            path="organization/verify-account/*"
            element={<OrganisationVerify />}
          />
          <Route path="checkinbox" element={<CheckInbox />} />
          <Route path="password-reset/*" element={<PasswordReset />} />
          <Route
            path="organization/password-reset/*"
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
