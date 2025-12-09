import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, sendOTP, login } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [step, setStep] = useState(1); // 1: form, 2: OTP
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'Student',
    contactNumber: '',
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const result = await sendOTP(formData.email);
      
      if (result.success) {
        setStep(2);
      } else {
        // Extract error message
        const errorMessage = result.error?.message || result.error || 'Failed to send OTP';
        setError(errorMessage);
        console.error('OTP Error:', {
          message: errorMessage,
          fullError: result.error,
          status: result.status
        });
      }
    } catch (err) {
      console.error('OTP Request Exception:', err);
      setError('Network error. Please check if the backend server is running on http://localhost:4000');
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const signupData = {
      ...formData,
      otp,
    };

    const result = await signup(signupData);
    
    if (result.success) {
      // Auto login after signup
      const loginResult = await login(formData.email, formData.password);
      if (loginResult.success) {
        authLogin(loginResult.data.token, loginResult.data.user);
        navigate('/');
      } else {
        navigate('/login');
      }
    } else {
      setError(result.error?.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {step === 1 ? 'Create Account' : 'Verify OTP'}
            </h2>
            <p className="text-gray-400">
              {step === 1 ? 'Sign up to get started' : `Enter OTP sent to ${formData.email}`}
            </p>
          </div>

          {step === 1 ? (
            <form className="space-y-5" onSubmit={handleSendOTP}>
              {error && (
                <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-r-lg">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="accountType" className="block text-sm font-semibold text-gray-300 mb-2">
                  Account Type
                </label>
                <select
                  id="accountType"
                  name="accountType"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.accountType}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                >
                  <option value="Student">Student</option>
                  <option value="Organization">Organization</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-300 mb-2">
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleSignup}>
              {error && (
                <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-r-lg">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-300 mb-2">
                  Enter 6-digit OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  ← Back to form
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

