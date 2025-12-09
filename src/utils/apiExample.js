/**
 * Example usage of the API connector
 * This file demonstrates how to use the API functions
 */

import { login, signup, getAllInternships, getProfile } from './api';
import apiConnector, { apiMethods, endpoints } from './apiConnector';

// ==================== Example 1: Using convenience functions ====================

// Login example
const handleLogin = async () => {
  const result = await login('user@example.com', 'password123');
  
  if (result.success) {
    // Store token if provided
    if (result.data.token) {
      localStorage.setItem('token', result.data.token);
    }
    console.log('Login successful:', result.data);
  } else {
    console.error('Login failed:', result.error);
  }
};

// Signup example
const handleSignup = async (formData) => {
  const result = await signup(formData);
  
  if (result.success) {
    console.log('Signup successful:', result.data);
  } else {
    console.error('Signup failed:', result.error);
  }
};

// Get all internships example
const fetchInternships = async () => {
  const result = await getAllInternships({ category: 'tech', page: 1 });
  
  if (result.success) {
    console.log('Internships:', result.data);
  } else {
    console.error('Failed to fetch internships:', result.error);
  }
};

// ==================== Example 2: Using apiMethods directly ====================

const customApiCall = async () => {
  const result = await apiMethods.get('/custom-endpoint', {
    params: { id: 123 }
  });
  
  if (result.success) {
    console.log('Data:', result.data);
  }
};

// ==================== Example 3: Using apiConnector directly ====================

const directApiCall = async () => {
  try {
    const response = await apiConnector.get('/some-endpoint');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// ==================== Example 4: Using in React component ====================

/*
import React, { useState, useEffect } from 'react';
import { getAllInternships } from '../utils/api';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getAllInternships();
      
      if (result.success) {
        setInternships(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {internships.map(internship => (
        <div key={internship._id}>{internship.title}</div>
      ))}
    </div>
  );
};
*/

export {
  handleLogin,
  handleSignup,
  fetchInternships,
  customApiCall,
  directApiCall,
};

