import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = () => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    balance: 0
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);


  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem('access');
    return {
      Authorization: `JWT ${accessToken}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`auth/users/me/`, {
        headers: getAuthHeaders()
      });
      setUser(response.data);
    } catch (error) {
      toast.error('Failed to load user data. Please try again.');
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      const updateData = {
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        phone_number: user.phone_number
      };

      const response = await axios.patch(
        `auth/users/me/`,
        updateData,
        { headers: getAuthHeaders() }
      );

      setUser(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Error updating user:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchUserData(); 
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage your profile information</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.first_name ? user.first_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {user.first_name && user.last_name 
                      ? `${user.first_name} ${user.last_name}` 
                      : 'Complete Your Profile'}
                  </h2>
                  <p className="text-blue-100">{user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Balance</p>
                <p className="text-2xl font-bold text-white">${user.balance?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <form onSubmit={handleUpdateUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={user.id}
                    disabled
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      !isEditing ? 'cursor-not-allowed opacity-60' : ''
                    }`}
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      !isEditing ? 'cursor-not-allowed opacity-60' : ''
                    }`}
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={user.phone_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      !isEditing ? 'cursor-not-allowed opacity-60' : ''
                    }`}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account Balance
                  </label>
                  <input
                    type="text"
                    value={`$${user.balance?.toFixed(2)}`}
                    disabled
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="3"
                    className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
                      !isEditing ? 'cursor-not-allowed opacity-60' : ''
                    }`}
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end space-x-4">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        
        <div className="mt-6 bg-gray-800 rounded-lg shadow-lg px-6 py-4 border-l-4 border-blue-500">
          <div className="flex items-start">
            <svg className="h-6 w-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-white">Information</h3>
              <p className="mt-1 text-sm text-gray-400">
                Your email and user ID cannot be changed. Only personal information can be updated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;