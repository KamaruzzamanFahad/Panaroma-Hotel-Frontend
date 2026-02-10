import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const Activate = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [isActivating, setIsActivating] = useState(true);
  const [activationError, setActivationError] = useState('');

  useEffect(() => {
    const activateAccount = async () => {
      if (!uid || !token) {
        setActivationError('Invalid activation link.');
        setIsActivating(false);
        toast.error('Invalid activation link.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      try {
        const response = await axios.post('auth/users/activation/', {
          uid,
          token
        });

        if (response.status === 204 || response.status === 200) {
          toast.success('Account activated successfully! Redirecting to login...', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setTimeout(() => {
            navigate('/auth/login');
          }, 2000);
        }
      } catch (error) {
        setIsActivating(false);
        let errorMessage = 'Activation failed. Please try again.';

        if (error.response) {
          if (error.response.data) {
            const apiErrors = error.response.data;
            if (typeof apiErrors === 'object') {
              errorMessage = Object.entries(apiErrors)
                .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                .join('; ');
            } else {
              errorMessage = apiErrors.toString();
            }
          } else {
            errorMessage = `Error: ${error.response.status} - ${error.response.statusText}`;
          }
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }

        setActivationError(errorMessage);
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center">
          {isActivating ? (
            <>
              <h1 className="text-3xl font-bold text-white mb-4">Activating Account</h1>
              <p className="text-gray-400 mb-8">Please wait while we activate your account...</p>
              <div className="flex justify-center">
                <svg className="animate-spin h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-white mb-4">Activation Failed</h1>
              <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
                <p className="text-red-200 text-sm">{activationError}</p>
              </div>
              <button
                onClick={() => navigate('/auth/login')}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition"
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activate;