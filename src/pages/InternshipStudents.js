import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudentProfileModal from '../components/StudentProfileModal';
import { getOrganizationInternships } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const InternshipStudents = () => {
  const { internshipId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user && user.accountType !== 'Organization') {
      navigate('/dashboard');
      return;
    }
    if (internshipId) {
      fetchInternship();
    }
  }, [internshipId, user, isAuthenticated, authLoading]);

  const fetchInternship = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await getOrganizationInternships();
      if (result.success) {
        const foundInternship = result.data.data.find(
          (intern) => intern._id === internshipId
        );
        if (foundInternship) {
          setInternship(foundInternship);
        } else {
          setError('Internship not found or you do not have access to it');
        }
      } else {
        setError(result.error?.message || 'Failed to fetch internship');
      }
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12 text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error && !internship) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-r-lg">
            {error}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const students = internship?.studentsEnrolled || [];

  const handleStudentClick = (studentId) => {
    setSelectedStudentId(studentId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudentId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-6 px-4 py-2 text-sm text-gray-300 hover:text-indigo-400 hover:bg-gray-800 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Enrolled Students
          </h1>
          <p className="text-gray-400 text-lg">
            {internship?.internshipName} - {internship?.internshipRole}
          </p>
        </div>

        {students.length === 0 ? (
          <div className="bg-gray-800 p-12 rounded-2xl shadow-lg border border-gray-700 text-center">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-xl text-gray-400 font-medium mb-2">No students enrolled yet</p>
            <p className="text-gray-500">Students who apply will appear here</p>
          </div>
        ) : (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Total Enrolled: <span className="text-indigo-400">{students.length}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student, idx) => {
                // Handle both object and string ID formats
                const studentId = typeof student === 'object' 
                  ? (student._id ? student._id.toString() : student.toString())
                  : student.toString();
                return (
                  <div 
                    key={idx} 
                    onClick={() => handleStudentClick(studentId)}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {student.firstName?.[0] || 'S'}{student.lastName?.[0] || 'T'}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {student.firstName || 'Student'} {student.lastName || ''}
                        </h3>
                        <p className="text-sm text-gray-400">{student.email || 'No email'}</p>
                      </div>
                    </div>
                    {student.contactNumber && (
                      <p className="text-sm text-gray-400 mb-2">
                        <span className="font-medium">Contact:</span> {student.contactNumber}
                      </p>
                    )}
                    <p className="text-xs text-indigo-400 font-medium mt-3">Click to view full profile →</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <StudentProfileModal
        studentId={selectedStudentId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default InternshipStudents;

