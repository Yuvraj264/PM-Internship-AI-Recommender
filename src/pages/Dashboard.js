import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllInternships, enrollStudent, getOrganizationInternships, createInternship, getAllCategories } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [internships, setInternships] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    internshipName: '',
    internshipDescription: '',
    internshipRole: '',
    category: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user) {
      fetchData();
      if (user.accountType === 'Organization') {
        fetchCategories();
      }
    }
  }, [user, isAuthenticated, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      if (user.accountType === 'Organization') {
        const result = await getOrganizationInternships();
        if (result.success) {
          setInternships(result.data.data || []);
        } else {
          setError(result.error?.message || 'Failed to fetch internships');
        }
      } else {
        // Admin and Student see all internships
        const result = await getAllInternships();
        if (result.success) {
          setInternships(result.data.data || []);
        } else {
          setError(result.error?.message || 'Failed to fetch internships');
        }
      }
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const result = await getAllCategories();
    if (result.success) {
      setCategories(result.data.allCategory || []);
    }
  };

  const handleEnroll = async (internshipId) => {
    setError('');
    setSuccess('');
    
    try {
      const result = await enrollStudent(internshipId);
      if (result.success) {
        setSuccess('Successfully enrolled in internship!');
        fetchData(); // Refresh data
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorMsg = result.error?.message || result.error || 'Failed to enroll';
        setError(errorMsg);
        console.error('Enrollment error:', result);
      }
    } catch (err) {
      console.error('Enrollment exception:', err);
      setError('Network error. Please check if the backend server is running.');
    }
  };

  const handleCreateInternship = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const result = await createInternship(formData);
      if (result.success) {
        setSuccess('Internship created successfully!');
        setFormData({
          internshipName: '',
          internshipDescription: '',
          internshipRole: '',
          category: '',
        });
        setShowForm(false);
        fetchData(); // Refresh data
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorMsg = result.error?.message || result.error || 'Failed to create internship';
        setError(errorMsg);
        console.error('Create internship error:', result);
      }
    } catch (err) {
      console.error('Create internship exception:', err);
      setError('Network error. Please check if the backend server is running.');
    }
  };

  const isStudent = user?.accountType === 'Student';
  const isAdmin = user?.accountType === 'Admin';
  const isOrganization = user?.accountType === 'Organization';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {isAdmin && 'Admin Dashboard'}
              {isStudent && 'Student Dashboard'}
              {isOrganization && 'Organization Dashboard'}
            </h1>
            <p className="text-gray-400 text-lg">
              {isAdmin && 'View and manage all internships in the system'}
              {isStudent && 'Browse and apply to available internships'}
              {isOrganization && 'View students enrolled in your internships'}
            </p>
          </div>
          {isOrganization && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {showForm ? 'Cancel' : '+ Create Internship'}
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-r-lg mb-6 shadow-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border-l-4 border-green-500 text-green-200 px-4 py-3 rounded-r-lg mb-6 shadow-sm">
            {success}
          </div>
        )}

        {showForm && isOrganization && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Create New Internship</h2>
            <form onSubmit={handleCreateInternship} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Internship Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.internshipName}
                  onChange={(e) => setFormData({ ...formData, internshipName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Role *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.internshipRole}
                  onChange={(e) => setFormData({ ...formData, internshipRole: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  value={formData.internshipDescription}
                  onChange={(e) => setFormData({ ...formData, internshipDescription: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Internship
              </button>
            </form>
          </div>
        )}

        {internships.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl text-gray-400 font-medium">
              {isOrganization ? 'No internships created yet' : 'No internships available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <div key={internship._id} className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 border border-gray-700 hover:-translate-y-1">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-indigo-900/50 text-indigo-300 text-xs font-semibold rounded-full mb-3 border border-indigo-700/50">
                    {internship.category?.name || 'Uncategorized'}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {internship.internshipName}
                  </h3>
                  <p className="text-indigo-400 font-semibold mb-3">
                    {internship.internshipRole}
                  </p>
                </div>
                {internship.organizationName && (
                  <p className="text-gray-400 mb-3 text-sm">
                    <span className="font-medium">Organization:</span>{' '}
                    {internship.organizationName.firstName} {internship.organizationName.lastName}
                  </p>
                )}
                {internship.internshipDescription && (
                  <p className="text-gray-400 mb-4 text-sm line-clamp-3 leading-relaxed">
                    {internship.internshipDescription}
                  </p>
                )}

                {/* Organization View - Show View Students Button */}
                {isOrganization && (
                  <div className="mt-5 pt-5 border-t border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-white">
                        Enrolled Students
                      </p>
                      <span className="px-3 py-1 bg-indigo-900/50 text-indigo-300 text-sm font-bold rounded-full border border-indigo-700/50">
                        {internship.studentsEnrolled?.length || 0}
                      </span>
                    </div>
                    <Link
                      to={`/internship/${internship._id}/students`}
                      className="w-full block text-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      View Enrolled Students
                    </Link>
                  </div>
                )}

                {/* Student View - Show Apply Button */}
                {isStudent && (
                  <div className="mt-5 pt-5 border-t border-gray-700">
                    {internship.studentsEnrolled?.some(
                      (student) => {
                        const studentId = student._id || student;
                        const userId = user._id || user.id;
                        return studentId.toString() === userId.toString();
                      }
                    ) ? (
                      <button
                        disabled
                        className="w-full bg-gray-700 text-gray-500 px-4 py-3 rounded-xl font-semibold cursor-not-allowed"
                      >
                        ✓ Already Applied
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(internship._id)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                )}

                {/* Admin View - Show Stats */}
                {isAdmin && (
                  <div className="mt-5 pt-5 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-300">
                        Enrolled Students
                      </p>
                      <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-sm font-bold rounded-full border border-purple-700/50">
                        {internship.studentsEnrolled?.length || 0}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

