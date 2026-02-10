import React, { useState } from 'react';
import { MapPin, Calendar, Search, ChevronDown } from 'lucide-react';
import img from "../assets/hero.webp"
import { useNavigate } from 'react-router';
const LuxuryHeroSection = ({is_authenticated}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    window.location.href = `/hotels?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&destination=${destination}`;
  };

  return (
    <div className="relative min-h-[70vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${img})`,
        }}
      />

      <div className="relative z-10 flex flex-col">
        <div className="container mx-auto items-center justify-center px-4  pt-20 pb-32">
          <div className="">
            <div className="mb-12 md:mb-16">
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
    Panaroma — A World of Refined Luxury Stays
  </h1>
  <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-5xl leading-relaxed">
    Elevate every journey with timeless elegance, exceptional comfort, and effortless booking.
    <br />
    Discover handpicked luxury hotels and indulge in an unforgettable stay with Panaroma.
    <br />
  </p>
</div>


            <div className="mb-8 md:mb-12">
              {is_authenticated ? (
                <button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl">
                  Dashboard
                </button>
              ) : (
                <button onClick={() => navigate('/auth/login')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl">
                  Sign In / Register
                </button>
              )}
            </div>

            <div className="w-full">
              <div className="hidden lg:block">
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-700/50 rounded-xl px-4 py-1 border-1  flex items-center gap-3 border-gray-400 hover:border-slate-500/50 transition-colors">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search destinations"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-full text-sm"
                      />
                    </div>

                    <div className="flex-1 bg-slate-700/50 rounded-xl px-4 py-1 border-1  flex items-center gap-3 border-gray-400 hover:border-slate-500/50 transition-colors">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <input
                        type="date"
                        placeholder="Check in"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="bg-transparent text-white placeholder-gray-400  border-none outline-none w-full text-sm"
                      />
                    </div>

                    <div className="flex-1 bg-slate-700/50 rounded-xl px-4 py-1 border-1  flex items-center gap-3 border-gray-400 hover:border-slate-500/50 transition-colors">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <input
                        type="date"
                        placeholder="Check out"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-full text-sm"
                      />
                    </div>

                    <div className="flex-1 bg-slate-700/50 rounded-xl px-4 py-1 border-1  flex items-center gap-3 border-gray-400 hover:border-slate-500/50 transition-colors">
                      <input
                        type="text"
                        placeholder="Add guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-full text-sm"
                      />
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                    </div>

                    <button onClick={handleSearch} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                      <Search className="w-5 h-5" />
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50 space-y-3">
                  <div className="bg-slate-700/50 rounded-xl px-4 py-1 flex items-center gap-3 border-1 border-gray-400">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search destinations"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-full text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-700/50 rounded-xl px-4 py-1 flex items-center gap-3 border-1 border-gray-400">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Check in"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-full text-sm"
                      />
                    </div>

                    <div className="bg-slate-700/50 rounded-xl px-4 py-1 flex items-center gap-3 border-1 border-gray-400">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Check out"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-full text-sm"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-xl px-4 py-1 flex items-center justify-between border-1 border-gray-400">
                    <input
                      type="text"
                      placeholder="Add guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-full text-sm"
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>

                  <button onClick={handleSearch} className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryHeroSection;