import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getAllCategories, createCategory } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  // Handle case where user might not be authenticated
  const isAdmin = user?.accountType === 'Admin';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const result = await getAllCategories();
    if (result.success) {
      setCategories(result.data.allCategory || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await createCategory(formData);
    if (result.success) {
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchCategories();
    } else {
      setError(result.error?.message || 'Failed to create category');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Categories
            </h1>
            <p className="text-gray-400">Browse available internship categories</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {showForm ? 'Cancel' : '+ Add Category'}
            </button>
          )}
        </div>

        {showForm && isAdmin && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Create New Category</h2>
            {error && (
              <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-r-lg mb-6">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Category
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl text-gray-400 font-medium">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-xl text-gray-400 font-medium">No categories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category._id} className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 border border-gray-700 hover:-translate-y-1">
                <h3 className="text-xl font-bold text-white mb-3">{category.name}</h3>
                <p className="text-gray-400 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;

