import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      authLogin(result.data.token, result.data.user);
      navigate('/');
    } else {
      setError(result.error?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-r-lg">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

