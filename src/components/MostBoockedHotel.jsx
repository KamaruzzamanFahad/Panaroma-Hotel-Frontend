import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Star } from 'lucide-react';

export default function MostBookedHotels({ hotel }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

 
  const hotels = hotel?.results || [];

 
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rattings, 0);
    return (sum / reviews.length).toFixed(1);
  };

 
  const getRatingLabel = (rating) => {
    if (rating >= 8.5) return "Excellent";
    if (rating >= 7.5) return "Very Good";
    if (rating >= 7) return "Good";
    return "Pleasant";
  };

 
  const calculateStars = (rating) => {
    if (rating >= 9) return 5;
    if (rating >= 8) return 4;
    if (rating >= 7) return 3;
    return 2;
  };

 
  const extractLocation = (address) => {
    if (!address) return "Hotel in Bangladesh";
 
    const parts = address.split(',').map(p => p.trim());
    return `Hotel in ${parts[parts.length - 1] || 'Bangladesh'}`;
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.5) return "bg-green-600";
    if (rating >= 7.5) return "bg-blue-600";
    if (rating >= 7) return "bg-cyan-600";
    return "bg-amber-600";
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % hotels.length);
    setAutoSlide(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + hotels.length) % hotels.length);
    setAutoSlide(false);
  };

  useEffect(() => {
    if (!autoSlide || hotels.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hotels.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoSlide, hotels.length]);

 
  const getVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4;
  };

  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };
    window.addEventListener('resize', handleResize);
    setVisibleSlides(getVisibleSlides());
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
  if (hotels.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden pt-20">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl group/card hover:shadow-xl hover:shadow-cyan-500/20 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded w-1/2 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 mb-[-20vh] to-slate-950 overflow-hidden pt-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Most booked hotels in Bangladesh in the past month
            </h2>
          </div>
          <button onClick={() => window.location.href = "/hotels"} className="mt-2 sm:mt-0 px-4 py-2 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300 text-sm font-medium whitespace-nowrap">
            See all
          </button>
        </div>

        <div className="relative group">
          <div className="overflow-hidden rounded-xl">
            <div className="relative">
              <div className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(currentSlide * 100) / visibleSlides}%)`
                }}>
                {hotels.map((hotelItem, index) => {
                  const avgRating = calculateAverageRating(hotelItem.review);
                  const numericRating = parseFloat(avgRating) || 0;
                  const ratingLabel = getRatingLabel(numericRating);
                  const reviewCount = hotelItem.review?.length || 0;
                  const stars = calculateStars(numericRating);
                  const location = extractLocation(hotelItem.address);

                  return (
                    <div
                      key={hotelItem.id}
                      className="flex-shrink-0"
                      style={{
                        width: `${100 / visibleSlides}%`,
                        minWidth: `${100 / visibleSlides}%`
                      }}
                    >
                      <div className="p-2 sm:p-3">
                        <div onClick={() => window.location.href = `/hotel/${hotelItem.id}`} className="bg-gradient-to-br cursor-pointer from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl group/card hover:shadow-xl hover:shadow-cyan-500/20 h-full">
                          
                          
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={hotelItem.image || "https://picsum.photos/500/300?random=200"}
                              alt={hotelItem.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            
                            
                            <div className="absolute top-3 left-3 flex gap-0.5">
                              {[...Array(stars)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-lg">★</span>
                              ))}
                            </div>
                          </div>

                          
                          <div className="p-4">
                            
                            <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover/card:text-cyan-400 transition-colors duration-300 line-clamp-2">
                              {hotelItem.name || "Hotel Name"}
                            </h3>
                            
                            
                            <p className="text-xs sm:text-sm text-slate-400 mb-3">
                              {location}
                            </p>

                            
                            <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm text-green-400">
                              <TrendingUp size={14} />
                              <span className="line-clamp-1">
                                Popular with guests booking hotels in Bangladesh
                              </span>
                            </div>

                            
                            <div className="flex items-center gap-2 pt-4 border-t border-slate-700/50">
                              <div className={`${getRatingColor(numericRating)} text-white text-xs font-bold rounded px-2 py-1 min-w-fit`}>
                                {numericRating > 0 ? numericRating : "N/A"}
                              </div>
                              <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-xs text-white font-semibold">
                                  {numericRating > 0 ? ratingLabel : "No rating yet"}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          
          <button
            onClick={prevSlide}
            onMouseEnter={() => setAutoSlide(false)}
            onMouseLeave={() => setAutoSlide(true)}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 -translate-x-4 sm:translate-x-0 z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            onMouseEnter={() => setAutoSlide(false)}
            onMouseLeave={() => setAutoSlide(true)}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-0 z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>

          
          <div className="flex justify-center gap-2 mt-6">
            {hotels.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setAutoSlide(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-cyan-500 w-8'
                    : 'bg-slate-600 w-2 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}