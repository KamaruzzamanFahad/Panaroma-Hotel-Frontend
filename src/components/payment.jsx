import { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, DollarSign, CreditCard, Check, AlertCircle, ArrowRight, ShieldCheck, Zap, Loader2 } from 'lucide-react';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [error, setError] = useState('');

  const quickAmounts = [10, 20, 50, 100, 500];

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) return;

      const response = await axios.get('auth/users/me/', {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });
      setCurrentBalance(response.data.balance || 0);
    } catch (err) {
      console.error('Error fetching balance:', err);
    } finally {
      setBalanceLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Balance Card */}
        <div className="bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 mb-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-indigo-100 text-sm font-medium mb-1 flex items-center gap-2">
              <Wallet size={14} />
              Available Balance
            </p>
            {balanceLoading ? (
              <div className="h-10 w-32 bg-white/20 animate-pulse rounded"></div>
            ) : (
              <h2 className="text-4xl font-extrabold text-white flex items-center gap-1">
                <span className="text-2xl mt-1">$</span>
                {currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            )}
            <div className="mt-4 flex items-center gap-2 text-white/80 text-xs">
              <Zap size={14} className="text-yellow-300" />
              <span>Instant deposits available for all regions</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-8 relative">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <CreditCard className="text-indigo-400" />
              Add Funds
            </h1>
            <p className="text-gray-400 text-sm">Securely add money to your account wallet</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-950/30 border border-red-500/50 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Quick Selection */}
          <div className="mb-8">
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Quick Select
            </label>
            <div className="grid grid-cols-3 gap-3">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 border ${
                    amount === amt.toString()
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20 scale-105'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-8">
            <label htmlFor="amount" className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Custom Amount
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                <DollarSign size={20} />
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
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white text-xl font-bold placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
          </div>

          {/* Summary */}
          {amount && parseFloat(amount) > 0 && (
            <div className="mb-8 p-5 bg-indigo-600/5 rounded-2xl border border-indigo-500/20 border-dashed">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Deposit Amount</span>
                <span className="text-white font-semibold">${parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-indigo-500/10">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-widest text-[10px]">Processing Fee</span>
                <span className="text-green-400 text-xs font-medium">Free</span>
              </div>
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading || !amount || parseFloat(amount) <= 0}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-500 group relative overflow-hidden ${
              loading || !amount || parseFloat(amount) <= 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] hover:-translate-y-1 active:scale-95'
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <span>Continue to Secure Pay</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
              <ShieldCheck size={14} className="text-green-500" />
              <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">SSL Encrypted Transaction</span>
            </div>
            <p className="text-gray-600 text-[10px] text-center max-w-[240px] leading-relaxed">
              Accepting VISA, MasterCard, Rocket, Bkash and Nagad. Payments processed globally via SSLCommerz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;