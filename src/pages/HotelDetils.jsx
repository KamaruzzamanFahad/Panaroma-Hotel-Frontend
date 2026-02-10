import React, { useState, useEffect } from 'react';
import { Heart, Share2, MapPin, Star, ChevronRight, X, ChevronLeft, User, Bed, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from 'flowbite-react';
import ReviewPage from '../components/myreviews';

const HotelDetailsPage = () => {
  const { id } = useParams(); // Get hotel ID from URL
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

  const closeModal = () => setIsModalOpen(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`hotels/${id}/`);
        setHotel(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching hotel:', err);
        setError('Failed to load hotel details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRoomsLoading(true);
        const response = await axios.get(`hotels/${id}/rooms/`);
        setRooms(response.data.results || []);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      } finally {
        setRoomsLoading(false);
      }
    };

    if (id) {
      fetchRooms();
    }
  }, [id]);

 
  const handleBooking = async (roomId) => {
    
    try {
      const accessToken = localStorage.getItem('access');
      console.log(accessToken);
      if (!accessToken) {
        toast('Please login to book a room');
        window.location.href = '/auth/login';
        return;
      }
      setBookingLoading(roomId);
      const response = await axios.post(
        `hotels/${id}/rooms/${roomId}/booking/`,
        {
            check_in:checkInDate,
            check_out:checkOutDate,
        },
        {
            headers: {
            Authorization: `JWT ${accessToken}`,
            },
        }
      );
      
 
      setBookingSuccess(roomId);
      
 
      const roomsResponse = await axios.get(`hotels/${id}/rooms/`);
      setRooms(roomsResponse.data.results || []);
      
 
      setTimeout(() => {
        setBookingSuccess(null);
      }, 3000);
      
    } catch (err) {
      const message =
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        'Something went wrong';
      
      if(message == 'Insufficient balance'){
        toast("Insufficient balance, Please add balance to your wallet");
      }else{
        toast(message);
      }
    } finally {
      setBookingLoading(null);
      setIsModalOpen(null);
    }
  };

 
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rattings, 0);
    return (sum / reviews.length).toFixed(1);
  };

 
  const getRatingLabel = (rating) => {
    if (rating >= 9) return "Excellent";
    if (rating >= 8) return "Very Good";
    if (rating >= 7) return "Good";
    if (rating >= 6) return "Pleasant";
    return "Fair";
  };

 
  const calculateStars = (rating) => {
    if (rating >= 9) return 5;
    if (rating >= 8) return 4;
    if (rating >= 7) return 3;
    if (rating >= 6) return 2;
    return 1;
  };

 
  const getTopReview = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
 
    return reviews.reduce((prev, current) => 
      (prev.rattings > current.rattings) ? prev : current
    );
  };

 
  const calculateStaffRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
 
    const avgRating = calculateAverageRating(reviews);
    return (parseFloat(avgRating) + 0.5).toFixed(1);
  };

  const nextImage = () => {
    if (!hotel?.images) return;
    setCurrentImage((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    if (!hotel?.images) return;
    setCurrentImage((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

 
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pt-20 flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

 
  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error || 'Hotel not found'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

 
  const avgRating = parseFloat(calculateAverageRating(hotel.review)) || 0;
  const ratingLabel = getRatingLabel(avgRating);
  const stars = calculateStars(avgRating);
  const reviewCount = hotel.review?.length || 0;
  const topReview = getTopReview(hotel.review);
  const staffRating = calculateStaffRating(hotel.review);
  
 
  const images = hotel.image 
    ? [hotel.image] 
    : [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80"
      ];

  const coupleRating = avgRating > 0 ? (avgRating + 0.1).toFixed(1) : null;



  
  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20">
        
        { isModalOpen &&
        <div className='w-full h-full z-[1000] fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm p-4'>
  <div className='bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all'>
    
    <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5'>
      <h2 className="text-2xl font-bold">Select Your Dates</h2>
      <p className="text-blue-100 text-sm mt-1">Choose your check-in and check-out dates</p>
    </div>

    
    <div className='px-6 py-6 space-y-6'>
      
      <div className='space-y-2'>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Check-in Date
        </label>
        <div className='relative'>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-[#3d3d3d] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
          />
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      
      <div className='space-y-2'>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Check-out Date
        </label>
        <div className='relative'>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || new Date().toISOString().split('T')[0]}
            className="w-full bg-[#3d3d3d] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
          />
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      
      {checkInDate && checkOutDate && new Date(checkOutDate) > new Date(checkInDate) && (
        <div className='bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg px-4 py-3'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-blue-200'>Total Nights</span>
            <span className='text-xl font-bold text-blue-300'>
              {Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))}
            </span>
          </div>
        </div>
      )}
    </div>

    
    <div className='px-6 py-4 bg-[#252525] flex gap-3'>
      <button
        onClick={closeModal}
        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition font-semibold"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          if (checkInDate && checkOutDate && new Date(checkOutDate) > new Date(checkInDate)) {
            handleBooking(isModalOpen);
          }
        }}
        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition font-semibold shadow-lg"
      >
        {bookingLoading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
  </div>
</div>
        }

      <div className="bg-[#2d2d2d] text-white px-4 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-start mb-2 flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <div className="w-5 h-5 bg-yellow-400 text-black flex items-center justify-center text-xs font-bold ml-1">
                  🏨
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{hotel.name}</h1>
              <div className="flex items-start gap-2 text-sm flex-wrap">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{hotel.address || "Dhaka, Bangladesh"}</span>
                {avgRating >= 8 && <span className="text-blue-400">– Excellent location</span>}
                <span className="text-blue-400">– show map</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded hover:bg-gray-700 transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded hover:bg-gray-700 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-400">💰 We Price Match</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <div className="grid grid-cols-2 gap-1">
                <div className="col-span-2 cursor-pointer" onClick={() => setShowGallery(true)}>
                  <img 
                    src={images[0]} 
                    alt={hotel.name} 
                    className="w-full h-[400px] object-cover hover:opacity-95 transition" 
                  />
                </div>
                {images.slice(1, 5).map((img, idx) => (
                  <div 
                    key={idx} 
                    className="cursor-pointer" 
                    onClick={() => { setCurrentImage(idx + 1); setShowGallery(true); }}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-[150px] object-cover hover:opacity-95 transition" 
                    />
                  </div>
                ))}
                {images.length > 5 && (
                  <div className="relative cursor-pointer" onClick={() => setShowGallery(true)}>
                    <img 
                      src={images[5] || images[0]} 
                      alt="" 
                      className="w-full h-[150px] object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center hover:bg-opacity-70 transition">
                      <span className="text-white font-semibold">+{images.length - 5} photos</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#2d2d2d] text-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                {hotel.name} - Experience comfort and hospitality
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>{hotel.description || "Experience world-class service and exceptional comfort at this wonderful hotel."}</p>
                
                <p>
                  Located in the heart of the city, this hotel offers easy access to major attractions, 
                  shopping centers, and business districts. The property features modern amenities and 
                  comfortable accommodations designed to make your stay memorable.
                </p>
                
                <p>
                  Each elegantly appointed room features air conditioning, flat-screen TV, and private bathroom. 
                  The hotel offers complimentary WiFi throughout the property, ensuring you stay connected 
                  during your visit.
                </p>
                
                {coupleRating && (
                  <p>
                    Couples in particular like the location – they rated it <strong>{coupleRating}</strong> for a two-person trip.
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Distance in property description is calculated using © OpenStreetMap
              </p>
            </div>

            
            <div className="bg-[#2d2d2d] text-white rounded-lg p-6 mt-6">
              <h3 className="text-2xl font-bold mb-4">Available Rooms</h3>
              
              {roomsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading rooms...</span>
                  </div>
                </div>
              ) : rooms.length > 0 ? (
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div 
                      key={room.id} 
                      className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        
                        <div className="md:w-48 h-32 flex-shrink-0">
                          <img 
                            src={room.images && room.images.length > 0 ? room.images[0] : hotel.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80"} 
                            alt={`Room ${room.room_number}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-bold text-white mb-1">
                                Room {room.room_number} - {room.room_type}
                              </h4>
                              <p className="text-sm text-gray-400 mb-2">
                                {room.description || "Comfortable room with modern amenities"}
                              </p>
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${room.status ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                              {room.status ? (
                                <>
                                  <CheckCircle size={14} />
                                  Available
                                </>
                              ) : (
                                <>
                                  <XCircle size={14} />
                                  Booked
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Bed size={16} />
                              <span>{room.room_type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              <span>{room.room_type === 'Single' ? '1 Guest' : room.room_type === 'Double' ? '2 Guests' : '2-4 Guests'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <DollarSign size={16} className="text-green-400" />
                              <span className="text-2xl font-bold text-white">
                                BDT {room.price_per_night?.toLocaleString() || '0'}
                              </span>
                              <span className="text-sm text-gray-400">per night</span>
                            </div>

                            <button
                              onClick={() => setIsModalOpen(room.id)}
                              disabled={!room.status || bookingLoading === room.id}
                              className={`px-6 py-2 rounded font-semibold transition ${
                                room.status && bookingLoading !== room.id
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                              } ${bookingSuccess === room.id ? 'bg-green-600 hover:bg-green-600' : ''}`}
                            >
                              {bookingLoading === room.id ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Booking...</span>
                                </div>
                              ) : bookingSuccess === room.id ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle size={16} />
                                  <span>Booked!</span>
                                </div>
                              ) : room.status ? (
                                'Reserve Now'
                              ) : (
                                'Not Available'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No rooms available at the moment</p>
                </div>
              )}
            </div>

            
            {hotel.review && hotel.review.length > 0 && (
              <div className="bg-[#2d2d2d] text-white rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Guest Reviews</h3>
                <div className="space-y-4">
                  {hotel.review.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 pb-4 last:border-0">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {review.user?.name ? review.user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">
                              {review.user?.name || "Guest"}
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < review.rattings ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-400">({review.rattings}/5)</span>
                          </div>
                          <p className="text-gray-300 text-sm">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-[#2d2d2d] text-white rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-lg font-bold">
                    {avgRating > 0 ? ratingLabel : "No ratings yet"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                  </div>
                </div>
                <div className="bg-blue-900 text-white text-2xl font-bold px-3 py-2 rounded">
                  {avgRating > 0 ? avgRating : "N/A"}
                </div>
              </div>

              {topReview && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Guests who stayed here loved</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">"{topReview.comment}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {topReview.user?.name ? topReview.user.name.charAt(0).toUpperCase() : "G"}
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">
                          {topReview.user?.name || "Guest"}
                        </div>
                        <div className="text-gray-400 flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < topReview.rattings ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 ml-auto mt-2" />
                </div>
              )}

              {staffRating && (
                <div className="flex justify-between items-center py-2 border-t border-gray-700">
                  <span className="font-semibold">Staff</span>
                  <span className="bg-blue-900 text-white px-2 py-1 rounded font-bold">
                    {staffRating}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-[#2d2d2d] rounded-lg overflow-hidden">
              <div className="h-[200px] bg-gray-200 relative">
                <div style={{ width: "100%" }}>
                  <iframe 
                    width="100%" 
                    height="200" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=dhaka+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                  </iframe>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 bg-pink-500 rounded-full border-4 border-white"></div>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold transition">
                Show on map
              </button>
            </div>

            <div className="bg-[#2d2d2d] text-white rounded-lg p-4">
              <h3 className="font-bold mb-3">Property highlights</h3>
              
              {avgRating >= 8 && (
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold">
                      Top Location: Highly rated by recent guests ({avgRating})
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">Breakfast Info</h4>
                <div className="text-sm">Buffet breakfast available</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl">🅿️</span>
                <span className="font-semibold text-sm">FREE parking available</span>
              </div>
            </div>

            {reviewCount > 1 && (
              <div className="bg-[#2d2d2d] text-white rounded-lg p-4">
                <h3 className="font-bold mb-2">Loyal Customers</h3>
                <p className="text-sm text-gray-300">
                  There are more repeat guests here than most other properties.
                </p>
              </div>
            )}

            <div>
                <ReviewPage hotelId={id} />
            </div>
          </div>
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 transition"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 z-10 transition"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div className="max-w-5xl max-h-[90vh] w-full">
            <img 
              src={images[currentImage]} 
              alt="" 
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <div className="text-white text-center mt-4 text-lg">
              {currentImage + 1} / {images.length}
            </div>
          </div>

          <button 
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 z-10 transition"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelDetailsPage;