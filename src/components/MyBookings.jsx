import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, CreditCard, Bed, Clock, AlertCircle, ExternalLink } from 'lucide-react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const accessToken = localStorage.getItem('access');
            const response = await axios.get('my-bookings/', {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                }
            });
            setBookings(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError(err.response?.data?.message || 'Failed to load your bookings. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 flex flex-col items-center gap-4 text-center">
                <AlertCircle className="w-12 h-12 text-red-400" />
                <div>
                    <h3 className="text-xl font-bold text-red-200">Something went wrong</h3>
                    <p className="text-red-300/80 mt-1">{error}</p>
                </div>
                <button 
                    onClick={fetchBookings}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-100">No bookings found</h3>
                <p className="text-gray-400 mt-2 max-w-md mx-auto">
                    You haven't made any room bookings yet. Explore our top hotels and find your perfect stay!
                </p>
                <button 
                    className="mt-8 px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95"
                    onClick={() => window.location.href = '/hotels'}
                >
                    Browse Hotels
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {bookings.map((booking) => (
                    <div 
                        key={booking.id} 
                        className="group bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col md:flex-row"
                    >
                        {/* Hotel Image Section */}
                        <div className="md:w-72 h-56 md:h-auto relative overflow-hidden">
                            <img 
                                src={booking.hotelroom.hotel.image} 
                                alt={booking.hotelroom.hotel.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-purple-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg">
                                    {booking.hotelroom.room_type} Room
                                </span>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-100 group-hover:text-purple-400 transition-colors">
                                            {booking.hotelroom.hotel.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-400 mt-1">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">{booking.hotelroom.hotel.address}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                                            ${booking.total_cost}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total Stay</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-gray-700/50 my-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Bed className="w-4 h-4 text-purple-400" />
                                            <span className="text-xs font-medium uppercase tracking-wider">Room</span>
                                        </div>
                                        <p className="text-gray-100 font-semibold">{booking.hotelroom.room_number}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Clock className="w-4 h-4 text-pink-400" />
                                            <span className="text-xs font-medium uppercase tracking-wider">Booked On</span>
                                        </div>
                                        <p className="text-gray-100 font-semibold">
                                            {new Date(booking.booking_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Calendar className="w-4 h-4 text-blue-400" />
                                            <span className="text-xs font-medium uppercase tracking-wider">Check In</span>
                                        </div>
                                        <p className="text-gray-100 font-semibold">{booking.check_in}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Calendar className="w-4 h-4 text-green-400" />
                                            <span className="text-xs font-medium uppercase tracking-wider">Check Out</span>
                                        </div>
                                        <p className="text-gray-100 font-semibold">{booking.check_out}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-2">
                                    {booking.hotelroom.images.slice(0, 3).map((img, i) => (
                                        <img 
                                            key={img.id}
                                            src={img.image} 
                                            alt="Room" 
                                            className="w-10 h-10 rounded-lg object-cover border border-gray-700 hover:border-purple-500 transition-colors"
                                        />
                                    ))}
                                    {booking.hotelroom.images.length > 3 && (
                                        <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center text-xs font-bold text-gray-300 border border-gray-700">
                                            +{booking.hotelroom.images.length - 3}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button className="p-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-colors border border-gray-600/50 group/btn">
                                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover/btn:text-purple-400" />
                                    </button>
                                    <button className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
