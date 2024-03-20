import { Link } from "react-router-dom";

const CheckInbox = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-lg font-semibold text-center text-primary mb-4">
          Please check your email for the verification link
        </h1>

        <p className="text-sm text-center text-gray-600 mb-6">
          Follow the instructions in the email to verify your account.
        </p>

        <h2 className="text-center text-md mb-4">Verification not received?</h2>

        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/resendverifyaccount"
            className="inline-block w-full px-4 py-2 text-center text-white bg-primary rounded-full hover:bg-blue-300 focus:outline-none focus:ring"
          >
            Request new verification link
          </Link>

          <span className="text-gray-500">OR</span>

          <Link
            to="/login"
            className="inline-block w-full px-4 py-2 text-center text-white bg-primary rounded-full hover:bg-blue-300 focus:outline-none focus:ring"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckInbox;
