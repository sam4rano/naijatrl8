import Layout from "./layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Verify from "./auth/Verify";
import PasswordResetAdmin from "./auth/PasswordResetAdmin";
import PasswordReset from "./auth/PasswordReset";
import ForgotPassword from "./auth/ForgotPassword";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import CheckInbox from "./auth/CheckInbox";
import OrganisationVerify from "./auth/OrganisationVerify";
import ResendVerification from "./auth/ResendVerification";
import Developeraccount from "./pages/Developeraccount";
import HelpCenterVerified from "./pages/HelpCenterVerified";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import InternalHistory from "./utils/userHistory";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import TranslateUnregistered from "./components/TranslateUnregistered";

import ProtectedRoute from "./components/ProtectedRoute";
import NavVerified from "./navbar/NavVerified";
import ContactVerified from "./pages/ContactVerified";
import UserContainer from "./pages/UserContainer";
import AdminLayout from "./components/organization/AdminLayout";
import ErrorPage from "./ErrorPage";
import TranslateRegisteredUsers from "./components/TranslateRegisteredUsers";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route path="/" element={<TranslateUnregistered />} />

          <Route path="help_center" element={<HelpCenter />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="navverified" element={<NavVerified />} />
          <Route path="internalhistory" element={<InternalHistory />} />
          <Route path="developeraccount" element={<Developeraccount />} />
          <Route path="help_centerver" element={<HelpCenterVerified />} />
          <Route path="contactver" element={<ContactVerified />} />
          <Route
            path="translateregisteredusers"
            element={<TranslateRegisteredUsers />}
          />
          <Route path="/adminlayout" element={<AdminLayout />}></Route>
        </Route>
        <Route element={<UserContainer />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
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
          <Route
            path="resendverifyaccount/*"
            element={<ResendVerification />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
