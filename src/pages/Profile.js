import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserDetails, updateProfile, deleteProfile } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    gender: '',
    dateOfBirth: '',
    about: '',
    contactNumber: '',
  });
  const [originalData, setOriginalData] = useState({
    gender: '',
    dateOfBirth: '',
    about: '',
    contactNumber: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, logout, fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const result = await getUserDetails();
    if (result.success) {
      const userData = result.data.userDetails;
      const data = {
        gender: userData.additionalDetails?.gender || '',
        dateOfBirth: userData.additionalDetails?.dateOfBirth || '',
        about: userData.additionalDetails?.about || '',
        contactNumber: userData.additionalDetails?.contactNumber || userData.contactNumber || '',
      };
      setProfileData(data);
      setOriginalData(data);
    }
    setLoading(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const result = await updateProfile(profileData);
    if (result.success) {
      setSuccess('Profile updated successfully');
      setOriginalData(profileData);
      setIsEditing(false);
      fetchUser();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error?.message || 'Failed to update profile');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const result = await deleteProfile();
      if (result.success) {
        logout();
        navigate('/');
      } else {
        setError(result.error?.message || 'Failed to delete account');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl text-gray-400 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Profile
        </h1>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg mb-6 border border-gray-700">
          <div className="text-center">
            <div className="inline-block p-2 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-full mb-4 border border-indigo-700/50">
              <img
                src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-400 mb-1">{user?.email}</p>
            <span className="inline-block px-4 py-1 bg-indigo-900/50 text-indigo-300 text-sm font-semibold rounded-full mt-2 border border-indigo-700/50">
              {user?.accountType}
            </span>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Profile Details</h2>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
          </div>
          
          {error && (
            <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-r-lg mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-900/50 border-l-4 border-green-500 text-green-200 px-4 py-3 rounded-r-lg mb-6">
              {success}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Contact Number
                  </label>
                  <p className="text-white text-lg">
                    {profileData.contactNumber || 'Not provided'}
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Gender
                  </label>
                  <p className="text-white text-lg">
                    {profileData.gender || 'Not provided'}
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Date of Birth
                  </label>
                  <p className="text-white text-lg">
                    {profileData.dateOfBirth 
                      ? new Date(profileData.dateOfBirth).toLocaleDateString()
                      : 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  About
                </label>
                <p className="text-white leading-relaxed min-h-[60px]">
                  {profileData.about || 'No description provided'}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Delete Account
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={profileData.contactNumber}
                  onChange={(e) => setProfileData({ ...profileData, contactNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Gender *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={profileData.gender}
                  onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  About
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  value={profileData.about}
                  onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

