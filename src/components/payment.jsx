import { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  const generateOrderId = () => {
    return Math.random(9999999999).toString(36).substring(2, 15);
  };

  const handlePayment = async () => {
 
    setError('');

 
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const accessToken = localStorage.getItem('access');

      if (!accessToken) {
        setError('Authentication token not found. Please login again.');
        setLoading(false);
        return;
      }

      const orderId = generateOrderId();

      const response = await axios.post(
        'initiate-payment/',
        {
          amount: parseFloat(amount),
          order_id: orderId,
        },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

 
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        setError('Payment URL not received from server');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
 
        setError(err.response.data.message || 'Payment initiation failed');
      } else if (err.request) {
 
        setError('No response from server. Please check your connection.');
      } else {
 
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePayment();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Add Balance</h1>
            <p className="text-gray-400">Enter the amount you want to add</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Amount Input */}
          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-300 text-sm font-medium mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                $
              </span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Pay Now'
            )}
          </button>

          {/* Additional Info */}
          <p className="text-gray-500 text-xs text-center mt-6">
            Secure payment powered by SSLCommerz
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;