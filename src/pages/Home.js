import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="relative animated-gradient py-20 md:py-32 overflow-hidden">
        {/* Animated Particles Background */}
        <div className="particles absolute inset-0"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float-animation-delayed"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Find Your Dream
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Internship
              </span>
            </h1>
          </div>
          <div className="fade-in-up-delayed">
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed font-light">
              Discover opportunities that match your skills and career goals. 
              Connect with top companies and kickstart your professional journey with real-world experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="group px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-semibold border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 transform hover:-translate-y-1 pulse-glow"
                >
                  <span className="flex items-center gap-2">
                    Go to Dashboard
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              ) : (
                <>
                  <Link 
                    to="/category" 
                    className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-semibold border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-1"
                  >
                    Browse Internships
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 pulse-glow"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Why Choose PM Internship?
              </span>
            </h2>
            <p className="text-center text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Everything you need to kickstart your career and build your professional future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 text-center hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 scale-on-hover">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                🎯
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">Curated Opportunities</h3>
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                We handpick the best internship opportunities from verified companies to ensure quality experiences.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 text-center hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 scale-on-hover">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">Career Growth</h3>
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                Build your professional network and gain real-world experience that sets you apart from the competition.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 text-center hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 scale-on-hover">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                💼
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">Diverse Categories</h3>
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                Explore internships across various fields including tech, marketing, design, finance, and more.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 text-center hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 scale-on-hover">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                ✨
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-pink-300 transition-colors">Easy Application</h3>
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                Simple and streamlined application process. Apply to multiple internships with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="group py-6 transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block">
                <h3 className="text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  500+
                </h3>
                <div className="absolute inset-0 blur-xl opacity-30 bg-white"></div>
              </div>
              <p className="text-lg md:text-xl font-medium opacity-95">Active Internships</p>
            </div>
            
            <div className="group py-6 transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block">
                <h3 className="text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  10K+
                </h3>
                <div className="absolute inset-0 blur-xl opacity-30 bg-white"></div>
              </div>
              <p className="text-lg md:text-xl font-medium opacity-95">Students Registered</p>
            </div>
            
            <div className="group py-6 transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block">
                <h3 className="text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  200+
                </h3>
                <div className="absolute inset-0 blur-xl opacity-30 bg-white"></div>
              </div>
              <p className="text-lg md:text-xl font-medium opacity-95">Partner Companies</p>
            </div>
            
            <div className="group py-6 transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block">
                <h3 className="text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
                  95%
                </h3>
                <div className="absolute inset-0 blur-xl opacity-30 bg-white"></div>
              </div>
              <p className="text-lg md:text-xl font-medium opacity-95">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl float-animation-delayed"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have found their perfect internship match and launched their careers.
          </p>
          {isAuthenticated ? (
            <Link 
              to="/dashboard" 
              className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl text-lg font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 pulse-glow"
            >
              Go to Dashboard
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <Link 
              to="/signup" 
              className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl text-lg font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 pulse-glow"
            >
              Create Your Account
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800/50 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                PM Internship
              </h3>
              <p className="text-gray-500 text-sm">Connecting talent with opportunity</p>
            </div>
            <p className="text-gray-400 text-sm">&copy; 2024 PM Internship. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

