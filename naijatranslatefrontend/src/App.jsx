import Layout from "./layout/Layout";
import Title from "./utils/Title";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import Feedbackverified from "./pages/FeedbackVerified";
import HelpCenterVerified from "./pages/HelpCenterVerified";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import InternalHistory from "./utils/userHistory";


const queryClient = new QueryClient();

import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import TranslateForm from "./components/TranslateForm";

import ProtectedRoute from "./components/ProtectedRoute";
import NavVerified from "./navbar/NavVerified";
import ContactVerified from "./pages/ContactVerified";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route path="/" element={<TranslateForm />} />
          <Route path="/" element={<Title />} />
          <Route path="help_center" element={<HelpCenter />} />
          <Route path="contact" element={<Contact />} />
          <Route path="logincontainer" element={<LoginContainer />} />
          <Route path="signupcontainer" element={<SignupContainer />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="navverified" element={<NavVerified />} />
          <Route path="internalhistory" element={<InternalHistory />} />
          <Route path="feedbackver" element={<Feedbackverified />} />
          <Route path="help_centerver" element={<HelpCenterVerified />} />
          <Route path="contactver" element={<ContactVerified />} />
          <Route path="translateveruser" element={<TranslateVerUser />} />
        </Route>

        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="verify-account/:uid/:token" element={<Verify />} />
        <Route
          path="organization/verify-account/*"
          element={<OrganisationVerify />}
        />
        <Route path="checkinbox" element={<CheckInbox />} />

        <Route
          path="password-reset/:uidb64/:token"
          id="password-reset"
          element={<PasswordReset />}
        />
        <Route
          path="organization/password-reset/:uid/:token"
          element={<PasswordResetAdmin />}
        />
        <Route path="resendverifyaccount/*" element={<ResendVerification />} />
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
