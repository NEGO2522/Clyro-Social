import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebase';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleImageClick = () => {
    // Check if user is logged in
    const user = auth.currentUser;
    if (user) {
      // User is logged in, navigate to dashboard
      navigate('/dashboard');
    } else {
      // User is not logged in, navigate to login
      navigate('/login');
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    const track = trackRef.current;
    
    if (!carousel || !track) return;

    // Clone the first set of images and append to the end for seamless looping
    const trackItems = track.querySelector('.flex.space-x-6');
    const items = Array.from(trackItems.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      trackItems.appendChild(clone);
    });

    // Recalculate track width after cloning
    const trackWidth = track.scrollWidth / 2; // Since we duplicated the items
    const carouselWidth = carousel.offsetWidth;
    const maxScroll = trackWidth - carouselWidth;
    
    // Set initial position
    let position = 0;
    let animationId;
    const speed = 0.8; // Slightly faster speed for smoother loop
    let isResetting = false;

    const animate = () => {
      // Update position
      position += speed;
      
      // If we've scrolled past the first set of images
      if (position >= trackWidth) {
        // Instantly reset to the start without animation
        position = 0;
        track.style.transition = 'none';
        track.style.transform = `translateX(0)`;
        // Force reflow
        void track.offsetWidth;
      }
      
      // Apply smooth transition for normal scrolling
      track.style.transition = 'transform 0.2s ease-out';
      track.style.transform = `translateX(-${position}px)`;
      
      // Continue the animation
      animationId = requestAnimationFrame(animate);
    };

    // Start the animation
    animationId = requestAnimationFrame(animate);

    // Start the animation
    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const pauseOnHover = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const resumeOnHoverOut = () => {
      if (!animationId) {
        animationId = requestAnimationFrame(animate);
      }
    };

    carousel.addEventListener('mouseenter', pauseOnHover);
    carousel.addEventListener('mouseleave', resumeOnHoverOut);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      carousel.removeEventListener('mouseenter', pauseOnHover);
      carousel.removeEventListener('mouseleave', resumeOnHoverOut);
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="fixed w-full bg-gray-800/80 backdrop-blur-sm top-0 z-50 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <span className="text-2xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
                  Clyro
                  <span className="block h-0.5 w-0 group-hover:w-full bg-indigo-500 transition-all duration-300"></span>
                </span>
              </Link>
              <span className="hidden md:inline-flex items-center text-sm text-gray-400">
                <span className="h-1 w-1 rounded-full bg-gray-500 mr-2"></span>
                Connecting people together
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="group relative px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 overflow-hidden"
              >
                <span className="flex items-center">
                  <span className="mr-2">Get Started</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    <FaArrowRight className="w-4 h-4" />
                  </span>
                </span>
                {/* Animated background effect */}
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Image Carousel Section */}
          <div className="relative overflow-hidden py-12">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-light text-gray-100 leading-tight">
                One page. <span className="text-indigo-400">Every photo.</span> Every memory.
              </h2>
              <p className="mt-8 text-lg text-gray-400 max-w-2xl mx-auto">
                Capture, share, and relive your most precious moments in one beautiful space.
              </p>
            </div>
            <div className="mt-16">
              <div ref={carouselRef} className="relative h-[420px] w-full overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 shadow-inner">
                <div className="absolute inset-0 flex items-center">
                  <div className="relative h-full w-full">
                    <div 
                      ref={trackRef}
                      className="absolute top-0 left-0 h-full flex items-center will-change-transform"
                      style={{ width: 'max-content' }}
                    >
                      <div className="flex space-x-6 px-4">
                      {[
                        'https://edison365.com/wp-content/uploads/2021/10/how-to-run-a-hackathon.webp',
                        'https://media.bitcot.com/wp-content/uploads/2025/02/Tech-Conferences-in-2025-1.jpg',
                        'https://2k21.s3.amazonaws.com/s3uploadapi/Frame_1.png',
                        'https://cdn.venngage.com/template/thumbnail/small/37de5deb-1ca7-4e60-b254-374b08708817.webp',
                        'https://template.canva.com/EAFeeZwBxoc/3/0/600w-nXHNrUjuf3w.jpg'
                      ].map((src, index) => (
                        <div 
                          key={index}
                          className="flex-shrink-0 w-80 h-72 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-700 bg-gray-800 cursor-pointer"
                          onClick={handleImageClick}
                        >
                          <div className="relative w-full h-full group">
                            <img 
                              src={src} 
                              alt={`Community ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Gradient fades removed */}
            </div>
            <div className="flex justify-center mt-10 space-x-2">
              {[0, 1, 2, 3, 4, 5].map((dot) => (
                <button 
                  key={dot}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${dot === 0 ? 'w-8 bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  aria-label={`Go to slide ${dot + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to join us?</span>
                  <span className="block">Start your journey today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-100">
                  Join thousands of users who are already part of our community. Sign up now and never miss out on the fun!
                </p>
                <Link
                  to="/login"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center space-x-2">
              <span className="text-indigo-400 font-bold text-xl">Clyro</span>
              <span className="text-gray-400 text-sm">© {new Date().getFullYear()}</span>
              <p className="text-sm text-gray-500">
                Connecting people together
              </p>
            </div>
            <nav className="mt-4 md:mt-0 flex space-x-4">
              <Link 
                to="/terms" 
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/contact" 
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link 
                to="/shared-moments" 
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Shared Moments
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;