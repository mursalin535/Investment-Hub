import { Link } from 'react-router-dom';
import { Home, LogIn, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-4">
            404
          </h1>
          <p className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </p>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Sorry, the page you're looking for doesn't exist or you don't have permission to access it.
          </p>
        </div>

        {/* Illustration/Icon */}
        <div className="mb-12 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center border-2 border-gray-700">
            <ArrowLeft size={64} className="text-gray-500" />
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-300 mb-10 text-base md:text-lg">
          This page is only accessible when you're logged in. Please log in to continue exploring the Investment Hub.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
          >
            <Home size={20} />
            Go Home
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
          >
            <LogIn size={20} />
            Login
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 text-sm mt-12">
          If you believe this is a mistake, please{' '}
          <span className="text-amber-400 font-semibold">contact support</span>
        </p>
      </div>
    </div>
  );
}
