import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return '';
  };

  const validateName = (name, field) => {
    if (!name) return `${field} is required`;
    if (name.length < 2) return `${field} must be at least 2 characters`;
    if (!/^[a-zA-Z\s]+$/.test(name)) return `${field} must contain only letters`;
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone)) return 'Invalid phone number format';
    return '';
  };

  const validateAddress = (address) => {
    if (!address) return 'Address is required';
    if (address.length < 5) return 'Address must be at least 5 characters';
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'first_name':
        return validateName(value, 'First name');
      case 'last_name':
        return validateName(value, 'Last name');
      case 'phone_number':
        return validatePhone(value);
      case 'address':
        return validateAddress(value);
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    
    setSubmitError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newTouched = {};
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await axios.post('auth/users/', formData);
      
      if (response.status === 201) {
        setSubmitSuccess(true);
        setFormData({
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          address: '',
          phone_number: ''
        });
        setTouched({});
        setErrors({});
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          const apiErrors = error.response.data;
          if (typeof apiErrors === 'object') {
            const errorMessages = Object.entries(apiErrors)
              .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
              .join('; ');
            setSubmitError(errorMessages);
          } else {
            setSubmitError(apiErrors.toString());
          }
        } else {
          setSubmitError(`Error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else if (error.request) {
        setSubmitError('Network error. Please check your connection and try again.');
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Fill in your details to register</p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-900 border border-green-700 rounded-lg">
            <p className="text-green-200 text-sm">Registration successful! Check Your Email to Activate Your Account</p>
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            <p className="text-red-200 text-sm">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.first_name && touched.first_name
                    ? 'border-red-500 focus:ring-red-900'
                    : 'border-gray-600 focus:ring-indigo-900 focus:border-indigo-500'
                }`}
              />
              {errors.first_name && touched.first_name && (
                <p className="mt-1 text-xs text-red-400">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.last_name && touched.last_name
                    ? 'border-red-500 focus:ring-red-900'
                    : 'border-gray-600 focus:ring-indigo-900 focus:border-indigo-500'
                }`}
              />
              {errors.last_name && touched.last_name && (
                <p className="mt-1 text-xs text-red-400">{errors.last_name}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2.5 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.email && touched.email
                  ? 'border-red-500 focus:ring-red-900'
                  : 'border-gray-600 focus:ring-indigo-900 focus:border-indigo-500'
              }`}
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.password && touched.password
                    ? 'border-red-500 focus:ring-red-900'
                    : 'border-gray-600 focus:ring-indigo-900 focus:border-indigo-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2.5 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.phone_number && touched.phone_number
                  ? 'border-red-500 focus:ring-red-900'
                  : 'border-gray-600 focus:ring-indigo-900 focus:border-indigo-500'
              }`}
            />
            {errors.phone_number && touched.phone_number && (
              <p className="mt-1 text-xs text-red-400">{errors.phone_number}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="3"
              className={`w-full px-4 py-2.5 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:outline-none transition resize-none ${
                errors.address && touched.address
                  ? 'border-red-500 focus:ring-red-900'
                  : 'border-gray-600 focus:ring-indigo-900 focus:border-indigo-500'
              }`}
            />
            {errors.address && touched.address && (
              <p className="mt-1 text-xs text-red-400">{errors.address}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Register'
            )}
          </button>
        </form>
        { 
 
            <div className="mt-6 text-center text-sm text-gray-400">
            <p>Don't get verification email?{" "}
            <Link
                to="/auth/resend-verification"
                className="font-medium text-indigo-400 hover:text-indigo-300"
            >
                Resend Verification Email
            </Link>
            </p>
           </div>
 
        }
        
        <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Log in here
          </Link>
        </p>
      </div>
      </div>
      
    </div>
  );
};

export default Register;