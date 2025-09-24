import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth';
import { app } from '../firebase/firebase';
import { FaGoogle, FaEnvelope, FaArrowRight, FaExchangeAlt } from 'react-icons/fa';

// Initialize Firebase Auth
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSwapped, setIsSwapped] = useState(false);
  const navigate = useNavigate();

  const toggleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage({ text: 'Successfully signed in with Google!', type: 'success' });
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign in error:', error);
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Email Link Sign In
  const handleEmailLinkSignIn = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const actionCodeSettings = {
        url: window.location.origin + '/login',
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage({ 
        text: 'Check your email for the login link!', 
        type: 'success' 
      });
    } catch (error) {
      console.error('Email sign in error:', error);
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Render message component
  const renderMessage = () => {
    if (!message.text) return null;
    return (
      <div className={`p-4 mb-4 rounded-md ${
        message.type === 'error' 
          ? 'bg-red-50 text-red-700' 
          : 'bg-green-50 text-green-700'
      }`}>
        {message.text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex font-['Poppins'] relative overflow-hidden">
      <div className="relative w-full h-full flex flex-col lg:flex-row transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)]">
        {/* Left Column - Image */}
        <div 
          className={`hidden lg:flex lg:w-1/2 h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
            isSwapped ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)]">
            <div className="relative w-full max-w-md h-auto">
              <img 
                src="https://img.freepik.com/free-vector/social-media-design-concept_1284-5151.jpg" 
                alt="Social Media Design Concept"
                className="w-full h-auto object-contain rounded-2xl shadow-2xl transition-all duration-500 ease-out transform hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div 
          className={`w-full lg:w-1/2 h-screen flex items-center justify-center p-6 transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
            isSwapped ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="w-full max-w-md">

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Clyro
            </h1>
            <p className="text-gray-500 text-base md:text-lg">
              Sign in to continue to your account
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {renderMessage()}

          {/* Email Login Form */}
          <form className="space-y-6" onSubmit={handleEmailLinkSignIn}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1.5 tracking-wide">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending link...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send me a login link
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 text-sm font-medium tracking-wide">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm text-sm font-medium tracking-wide text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md"
              >
                <FaGoogle className="h-5 w-5 text-[#DB4437] mr-3" />
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Privacy Policy
              </Link>
            </p>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button 
          onClick={toggleSwap}
          className="hidden lg:flex absolute left-1/2 top-1/2 z-30 w-16 h-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl border-2 border-blue-100 text-blue-500 transition-all duration-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50"
          aria-label="Swap layout"
        >
          <FaExchangeAlt className={`w-7 h-7 transition-transform duration-500 ${isSwapped ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default Login;