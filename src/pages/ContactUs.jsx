import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowLeft, FaArrowRight, FaFacebookF, FaInstagram, FaExchangeAlt } from 'react-icons/fa';

const ContactUs = () => {
  const navigate = useNavigate();
  const [isSwapped, setIsSwapped] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  const toggleSwap = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsSwapped(!isSwapped);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the transition duration
  };

  return (
    <div className="min-h-screen bg-white flex font-['Poppins'] relative overflow-hidden">
      {/* Swap Button - Fixed in the middle */}
      <div className="hidden lg:flex items-center justify-center fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <button 
          onClick={toggleSwap}
          disabled={isAnimating}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isAnimating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Swap layout"
        >
          <FaExchangeAlt className={`text-xl ${isAnimating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="relative w-full h-full flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column - Image */}
        <div 
          className={`hidden lg:flex lg:w-1/2 h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative transition-all duration-500 ease-in-out transform ${
            isSwapped ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-500">
            <img 
              src="https://img.freepik.com/free-vector/social-media-login-concept-illustration_114360-1480.jpg" 
              alt="Social Media Illustration" 
              className="max-w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div 
          className={`w-full lg:w-1/2 flex flex-col min-h-screen bg-gray-50 relative transition-all duration-500 ease-in-out transform ${
            isSwapped ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                  <Link to="/" className="text-2xl font-bold text-indigo-600">Clyro</Link>
                </div>
              </div>
            </header>

          <main className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-white p-8 sm:p-10 md:p-12 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                        <FaEnvelope className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-medium text-gray-900">Email Us</h3>
                        <a href="mailto:support@clyro.com" className="text-indigo-600 hover:text-indigo-500 text-sm">
                          support@clyro.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex items-start w-full md:w-1/2">
                        <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                          <FaMapMarkerAlt className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900 mb-2">Visit Us</h3>
                          <div className="space-y-1">
                            <p className="text-gray-500 text-sm">
                              Poornima University<br />
                              IS-2027 to 2031, Ramchandrapura,<br />
                              Sitapura Extension,<br />
                              Jaipur, Rajasthan 303905
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md">
                        <iframe
                          width="100%"
                          height="220"
                          frameBorder="0"
                          style={{ border: 0 }}
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.3916!2d75.8004!3d26.8808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6b3a1a4b5a9%3A0x1a3a6b3b8b1b0b1a!2sPoornima%20University%2C%20Sitapura%20Extension%2C%20Jaipur%2C%20Rajasthan%20303905!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                          allowFullScreen=""
                          aria-hidden="false"
                          tabIndex="0"
                          title="Poornima University Location"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Follow Us</h3>
                    <div className="flex space-x-6">
                      <a
                        href="https://www.facebook.com/poornima.university/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="Facebook"
                      >
                        <FaFacebookF className="text-2xl" />
                      </a>
                      <a
                        href="https://www.instagram.com/poornima_uni/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-gray-400 hover:text-pink-600 transition-colors"
                        aria-label="Instagram"
                      >
                        <FaInstagram className="text-2xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          </main>
          
          <footer className="mt-auto bg-white border-t border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} Clyro. All rights reserved.
              </p>
            </div>
          </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;