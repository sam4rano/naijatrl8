const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="px-4 py-8 text-center bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">
          404 - Not Found
        </h1>
        <p className="mt-4 text-base text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
