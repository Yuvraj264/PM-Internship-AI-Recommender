/**
 * API Service Functions
 * Convenience functions for making API calls
 */

import { apiMethods, endpoints } from './apiConnector';

// ==================== AUTH API ====================

export const login = async (email, password) => {
  return await apiMethods.post(endpoints.AUTH.LOGIN, {
    email,
    password,
  });
};

export const signup = async (signupData) => {
  return await apiMethods.post(endpoints.AUTH.SIGNUP, signupData);
};

export const sendOTP = async (email) => {
  return await apiMethods.post(endpoints.AUTH.SEND_OTP, { email });
};

export const changePassword = async (oldPassword, newPassword, confirmNewPassword) => {
  return await apiMethods.post(endpoints.AUTH.CHANGE_PASSWORD, {
    oldPassword,
    newPassword,
    confirmNewPassword,
  });
};

export const resetPasswordToken = async (email) => {
  return await apiMethods.post(endpoints.AUTH.RESET_PASSWORD_TOKEN, { email });
};

export const resetPassword = async (token, password, confirmPassword) => {
  return await apiMethods.post(endpoints.AUTH.RESET_PASSWORD, {
    token,
    password,
    confirmPassword,
  });
};

// ==================== PROFILE API ====================

export const getUserDetails = async () => {
  return await apiMethods.get(endpoints.PROFILE.GET_USER_DETAILS);
};

export const getUserDetailsById = async (userId) => {
  return await apiMethods.get(endpoints.PROFILE.GET_USER_DETAILS_BY_ID(userId));
};

export const updateProfile = async (profileData) => {
  return await apiMethods.put(endpoints.PROFILE.UPDATE_PROFILE, profileData);
};

export const deleteProfile = async () => {
  return await apiMethods.delete(endpoints.PROFILE.DELETE_PROFILE);
};

// ==================== INTERNSHIP API ====================

export const getAllInternships = async () => {
  return await apiMethods.get(endpoints.INTERNSHIP.GET_ALL);
};

export const createInternship = async (internshipData) => {
  return await apiMethods.post(endpoints.INTERNSHIP.CREATE, internshipData);
};

export const getAllCategories = async () => {
  return await apiMethods.get(endpoints.INTERNSHIP.GET_ALL_CATEGORIES);
};

export const createCategory = async (categoryData) => {
  return await apiMethods.post(endpoints.INTERNSHIP.CREATE_CATEGORY, categoryData);
};

export const enrollStudent = async (internshipId) => {
  return await apiMethods.post(endpoints.INTERNSHIP.ENROLL_STUDENT, { internshipId });
};

export const getOrganizationInternships = async () => {
  return await apiMethods.get(endpoints.INTERNSHIP.GET_ORGANIZATION_INTERNSHIPS);
};

