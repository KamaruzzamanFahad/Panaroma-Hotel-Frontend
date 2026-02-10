import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Camera, DollarSign, TrendingUp, Users, Bed, Calendar, Edit2, Trash2, Plus, X, Save, Search, AlertCircle, Home, Building2, CreditCard, UserCog, Menu, ChevronLeft } from 'lucide-react';
import HotelRoomManage from './HotelRoomManage';
import axios from 'axios';
import ProfileMenu from './ProfileMenu';
import UserManagement from '../components/UserManagement';
import Payment from '../components/payment';
import { ToastContainer } from 'react-toastify';

const weeklyBookings = [
  { day: 'Mon', bookings: 12 },
  { day: 'Tue', bookings: 19 },
  { day: 'Wed', bookings: 15 },
  { day: 'Thu', bookings: 22 },
  { day: 'Fri', bookings: 28 },
  { day: 'Sat', bookings: 35 },
  { day: 'Sun', bookings: 31 },
];

const monthlyRevenue = [
  { month: 'Week 1', revenue: 12500 },
  { month: 'Week 2', revenue: 15800 },
  { month: 'Week 3', revenue: 18200 },
  { month: 'Week 4', revenue: 21500 },
];

export default function HotelDashboard() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('payment');

  const is_authenticated = localStorage.getItem("access");
  const [is_Admin, setIsAdmin] = useState('');

  const menuItems = useMemo(() => {
    if (is_Admin) {
      return [
        { id: 'dashboard', name: 'Dashboard', icon: Home },
        { id: 'hotel', name: 'Hotel Management', icon: Building2 },
        { id: 'payment', name: 'Payment', icon: CreditCard },
        { id: 'users', name: 'User Management', icon: UserCog },
      ];
    }
    return [
      { id: 'payment', name: 'Payment', icon: CreditCard },
      { id: 'users', name: 'User Management', icon: UserCog },
    ];
  }, [is_Admin]);

  useEffect(() => {
    if (is_Admin) {
      setActiveMenu('dashboard');
      fetchStatistics();
    }
  }, [is_Admin]);

  useEffect(() => {
    fetchIsAdmin();
  }, []);

  const fetchIsAdmin = async () => {
    try {
      const accessToken = localStorage.getItem('access');
      const response = await axios.post('is_admin/', {}, {
        headers: {
          Authorization: `JWT ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
      setIsAdmin(response.data.is_admin);
      setLoading(false);
      
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  }

  console.log("is_Admin", is_Admin);

  const fetchStatistics = async () => {
    try {
      
      setError(null);
      
      const accessToken = localStorage.getItem('access');
      
      const response = await axios.get('admin-statistics/', {
        headers: {
          Authorization: `JWT ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      setStatistics(response.data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError(err.response?.data?.message || 'Failed to load statistics');
    } finally {
      
    }
  };


  const currentMonthSales = statistics?.sales?.current_month || 0;
  const previousMonthSales = statistics?.sales?.previous_month || 0;
  const weekBookings = statistics?.bookings_count?.this_week || 0;
  const monthBookings = statistics?.bookings_count?.this_month || 0;
  const mostBookedRooms = statistics?.most_booked_rooms || [];
  const topUsers = statistics?.top_customers || [];

  const salesChange = previousMonthSales > 0 
    ? ((currentMonthSales - previousMonthSales) / previousMonthSales * 100).toFixed(1)
    : currentMonthSales > 0 ? 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex">
      <ToastContainer />
      
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800/80 backdrop-blur-sm border-r border-gray-700 transition-all duration-300 fixed h-full z-50`}>
        
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hotel Admin
              </h2>
              <p className="text-xs text-gray-400 mt-1">Management Portal</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors ml-auto"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            ) : (
              <Menu className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        
        <nav className="p-4 space-y-2">
          {
          menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${sidebarOpen ? '' : 'mx-auto'}`} />
                {sidebarOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-gray-200 truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@hotel.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {menuItems.find(item => item.id === activeMenu)?.name || 'Dashboard'}
                </h1>
                <p className="text-gray-400 mt-1">
                  {activeMenu === 'dashboard' && 'Manage your hotel operations efficiently'}
                  {activeMenu === 'hotel' && 'Manage hotels and rooms'}
                  {activeMenu === 'payment' && 'View and manage payments'}
                  {activeMenu === 'users' && 'Manage users and permissions'}
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-lg border border-purple-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                
                <ProfileMenu is_authenticated={is_authenticated}/>
              </div>
            </div>
          </div>
        </div>

        
        {activeMenu === 'dashboard' && (
          <div className="px-6 py-8">
            
            {error && (
              <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <div className="flex-1">
                  <p className="text-red-200">{error}</p>
                </div>
                <button 
                  onClick={fetchStatistics}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm font-medium">Current Month Sales</p>
                    <h3 className="text-3xl font-bold text-white mt-2">${currentMonthSales.toLocaleString()}</h3>
                    <p className="text-purple-200 text-xs mt-2">
                      {salesChange > 0 ? '+' : ''}{salesChange}% from last month
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-purple-300" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-200 text-sm font-medium">Previous Month Sales</p>
                    <h3 className="text-3xl font-bold text-white mt-2">${previousMonthSales.toLocaleString()}</h3>
                    <p className="text-pink-200 text-xs mt-2">Total revenue</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-pink-300" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Bookings This Week</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{weekBookings}</h3>
                    <p className="text-blue-200 text-xs mt-2">Active reservations</p>
                  </div>
                  <Calendar className="w-12 h-12 text-blue-300" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm font-medium">Bookings This Month</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{monthBookings}</h3>
                    <p className="text-green-200 text-xs mt-2">Total reservations</p>
                  </div>
                  <Bed className="w-12 h-12 text-green-300" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-gray-100">Weekly Bookings Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyBookings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Bar dataKey="bookings" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-gray-100">Monthly Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#EC4899" strokeWidth={3} dot={{ fill: '#EC4899', r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-gray-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Most Booked Rooms
                </h3>
                <div className="space-y-3">
                  {mostBookedRooms.length > 0 ? (
                    mostBookedRooms.map((room, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">🏨</div>
                          <div>
                            <p className="font-semibold text-gray-100">{room.hotel}</p>
                            <p className="text-sm text-gray-400">Room {room.room_number}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-400">{room.booking_count}</p>
                          <p className="text-xs text-gray-400">bookings</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-8">No booking data available</p>
                  )}
                </div>
              </div>


              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-gray-100 flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  Top Customers
                </h3>
                <div className="space-y-3">
                  {topUsers.length > 0 ? (
                    topUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">👤</div>
                          <div>
                            <p className="font-semibold text-gray-100">
                              {user.first_name || user.email.split('@')[0]}
                            </p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-pink-400">${user.total_spent.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">total spent</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-8">No customer data available</p>
                  )}
                </div>
              </div>
            </div>

            
          </div>
        )}

        {activeMenu === 'hotel' && (
          <div className="px-6 py-8">
            <HotelRoomManage/>
          </div>
        )}

        {activeMenu === 'payment' && (
          <div className="px-6 py-8">
            <Payment/>
          </div>
        )}

        {activeMenu === 'users' && (
          <div className="px-6 py-8">
            <UserManagement/>
          </div>
        )}
      </div>
    </div>
  );
}