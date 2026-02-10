import React, { useState } from 'react';
import { Star, MapPin, ChevronRight, ArrowRight } from 'lucide-react';

export default function TopPiksHotel({ hotel }) {
  const [expandedHotel, setExpandedHotel] = useState(null);

 
  const hotels = hotel?.results || [];

 
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rattings, 0);
    return (sum / reviews.length).toFixed(1);
  };

 
  const getRatingLabel = (rating) => {
    if (rating >= 9) return "Wonderful";
    if (rating >= 8) return "Excellent";
    if (rating >= 7) return "Very Good";
    if (rating >= 6) return "Good";
    return "Pleasant";
  };

  const getRatingColor = (rating) => {
    if (rating >= 9) return "bg-blue-600";
    if (rating >= 8) return "bg-green-600";
    return "bg-yellow-600";
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden py-20">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Top picks for hotels in Bangladesh
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Try one of these popular and highly-rated Bangladesh hotels
            </p>
          </div>
          <button onClick={() => window.location.href = "/hotels"} className="mt-2 sm:mt-0 px-4 py-2 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300 text-sm font-medium whitespace-nowrap">
            See all
          </button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {hotels.length > 0 ? (
            hotels.map((hotelItem, index) => {
              const avgRating = calculateAverageRating(hotelItem.review);
              const numericRating = parseFloat(avgRating) || 0;
              const ratingLabel = getRatingLabel(numericRating);
              const reviewCount = hotelItem.review?.length || 0;

              return (
                <div
                  key={hotelItem.id}
                  style={{
                    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                  className="group"
                >
                  <div onClick={() => window.location.href = `/hotel/${hotelItem.id}`} className="bg-gradient-to-br cursor-pointer from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl h-full flex flex-col hover:shadow-xl hover:shadow-cyan-500/20">
                    
                    
                    <div className="relative h-48 sm:h-40 overflow-hidden">
                      <img
                        src={hotelItem.image || "https://picsum.photos/300/250?random=100"}
                        alt={hotelItem.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/40"></div>
                    </div>

                    
                    <div className="p-4 flex-1 flex flex-col">
                      
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                        {hotelItem.name || "Hotel Name"}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mb-3">
                        {hotelItem.address || "Hotel in Bangladesh"}
                      </p>

                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`${getRatingColor(numericRating)} text-white text-xs font-bold rounded px-2 py-1 min-w-fit`}>
                          {numericRating > 0 ? numericRating : "N/A"}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-white font-semibold">
                            {numericRating > 0 ? ratingLabel : "No rating yet"}
                          </span>
                          <span className="text-xs text-slate-400">
                            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                          </span>
                        </div>
                      </div>

                      
                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 mb-3 flex-grow">
                        {hotelItem.description || "Experience comfort and luxury at this wonderful hotel located in the heart of Bangladesh."}
                      </p>

                      
                      <button 
                        onClick={() => setExpandedHotel(expandedHotel === hotelItem.id ? null : hotelItem.id)}
                        className="text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition-colors mb-4 flex items-center gap-1"
                      >
                        {expandedHotel === hotelItem.id ? 'Show less' : 'Show more'}
                        <ChevronRight size={14} className={`transition-transform ${expandedHotel === hotelItem.id ? 'rotate-90' : ''}`} />
                      </button>

                      
                      {expandedHotel === hotelItem.id && (
                        <div className="mb-4 pb-4 border-t border-slate-700/50 pt-3">
                          <p className="text-xs text-slate-300 mb-3">
                            {hotelItem.description || "Experience comfort and luxury at this wonderful hotel located in the heart of Bangladesh."}
                          </p>
                          
                          
                          {hotelItem.review && hotelItem.review.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-xs font-semibold text-white mb-2">Recent Reviews:</h4>
                              {hotelItem.review.slice(0, 3).map((review) => (
                                <div key={review.id} className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/30">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          size={10}
                                          className={i < review.rattings ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-slate-400">
                                      {review.user?.name || "Guest"}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-300">
                                    {review.comment}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      
                      <div className="border-t border-slate-700/50 pt-4 mt-auto">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-slate-400">From</span>
                          <span className="text-lg sm:text-xl font-bold text-white">
                            BDT 2,500
                          </span>
                          <span className="text-xs text-slate-400">per night</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              
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
          )}
        </div>

        
        {/* <div className="mt-12 text-center">
          <button className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 inline-flex items-center gap-2">
            <span className="relative z-10">View All Hotels</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div> */}
      </div>

      
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}