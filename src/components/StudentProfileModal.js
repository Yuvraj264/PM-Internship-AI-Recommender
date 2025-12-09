import React, { useState, useEffect } from 'react';
import { getUserDetailsById } from '../utils/api';

const StudentProfileModal = ({ studentId, isOpen, onClose }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && studentId) {
      fetchStudentDetails();
    }
  }, [isOpen, studentId]);

  const fetchStudentDetails = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await getUserDetailsById(studentId);
      if (result.success) {
        setStudent(result.data.userDetails);
      } else {
        setError(result.error?.message || 'Failed to fetch student details');
      }
    } catch (err) {
      setError('Failed to load student details');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Student Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-gray-400">Loading profile...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-r-lg">
              {error}
            </div>
          ) : student ? (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="text-center pb-6 border-b border-gray-700">
                <div className="inline-block p-2 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-full mb-4 border border-indigo-700/50">
                  <img
                    src={student.image || `https://api.dicebear.com/5.x/initials/svg?seed=${student.firstName} ${student.lastName}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-gray-400 mb-2">{student.email}</p>
                <span className="inline-block px-4 py-1 bg-indigo-900/50 text-indigo-300 text-sm font-semibold rounded-full border border-indigo-700/50">
                  {student.accountType}
                </span>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Contact Number
                  </label>
                  <p className="text-white">
                    {student.additionalDetails?.contactNumber || student.contactNumber || 'Not provided'}
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Gender
                  </label>
                  <p className="text-white">
                    {student.additionalDetails?.gender || 'Not provided'}
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Date of Birth
                  </label>
                  <p className="text-white">
                    {student.additionalDetails?.dateOfBirth 
                      ? new Date(student.additionalDetails.dateOfBirth).toLocaleDateString()
                      : 'Not provided'}
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Account Type
                  </label>
                  <p className="text-white">{student.accountType}</p>
                </div>
              </div>

              {student.additionalDetails?.about && (
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    About
                  </label>
                  <p className="text-white leading-relaxed">
                    {student.additionalDetails.about}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;

