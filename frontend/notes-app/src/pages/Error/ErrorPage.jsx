import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-grey-100 text-center p-5">
      <div className="max-w-lg">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
