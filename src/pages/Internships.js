import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getAllInternships, createInternship, getAllCategories } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    internshipName: '',
    internshipDescription: '',
    internshipRole: '',
    category: '',
  });
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchInternships();
    fetchCategories();
  }, []);

  const fetchInternships = async () => {
    setLoading(true);
    const result = await getAllInternships();
    if (result.success) {
      setInternships(result.data.data || []);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const result = await getAllCategories();
    if (result.success) {
      setCategories(result.data.allCategory || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await createInternship(formData);
    if (result.success) {
      setFormData({
        internshipName: '',
        internshipDescription: '',
        internshipRole: '',
        category: '',
      });
      setShowForm(false);
      fetchInternships();
    } else {
      setError(result.error?.message || 'Failed to create internship');
    }
  };

  const isOrganization = user?.accountType === 'Organization';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Internships</h1>
          {isOrganization && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Create Internship'}
            </button>
          )}
        </div>

        {showForm && isOrganization && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Create New Internship</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Internship Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.internshipName}
                  onChange={(e) => setFormData({ ...formData, internshipName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.internshipRole}
                  onChange={(e) => setFormData({ ...formData, internshipRole: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.internshipDescription}
                  onChange={(e) => setFormData({ ...formData, internshipDescription: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Internship
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading internships...</div>
        ) : internships.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No internships found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <div key={internship._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {internship.internshipName}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Role:</span> {internship.internshipRole}
                </p>
                {internship.organizationName && (
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Organization:</span>{' '}
                    {internship.organizationName.firstName} {internship.organizationName.lastName}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;

