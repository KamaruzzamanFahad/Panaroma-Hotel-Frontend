import React, { useState } from 'react';
import { MapPin, Hotel, ChevronRight } from 'lucide-react';

export default function DestinationGrid() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const destinations = [
    {
      id: 1,
      title: "Dhaka",
      description: "Dynamic capital blending tradition with contemporary culture",
      hotels: 342,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Drone_view_from_Kamal_Atat%C3%BCrk_Avenue.jpg/960px-Drone_view_from_Kamal_Atat%C3%BCrk_Avenue.jpg",
      color: "from-cyan-500/30 to-blue-500/30"
    },
    {
      id: 2,
      title: "Chittagong",
      description: "Bustling port city nestled between hills and sea",
      hotels: 156,
      image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Jamburi_Park.jpg",
      color: "from-orange-500/30 to-red-500/30"
    },
    {
      id: 3,
      title: "Sylhet",
      description: "Emerald green tea gardens and misty mountain landscapes",
      hotels: 89,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Tea_Garden_in_Malini_chora_Sylhet_Bangladesh_%283%29.JPG/1280px-Tea_Garden_in_Malini_chora_Sylhet_Bangladesh_%283%29.JPG",
      color: "from-green-500/30 to-emerald-500/30"
    },
    {
      id: 4,
      title: "Cox's Bazar",
      description: "World's longest sea beach with golden sands and turquoise waters",
      hotels: 234,
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Cox%27sBazar_Railway_Station_01.jpg/1280px-Cox%27sBazar_Railway_Station_01.jpg",
      color: "from-sky-500/30 to-cyan-500/30"
    },
    {
      id: 5,
      title: "Khulna",
      description: "Gateway to the Sundarbans mangrove forests and wildlife",
      hotels: 67,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Durbar_Bangla_at_kuet.jpg/1280px-Durbar_Bangla_at_kuet.jpg",
      color: "from-lime-500/30 to-green-500/30"
    },
    {
      id: 6,
      title: "Rajshahi",
      description: "Historic city of ancient temples and serene riverside charm",
      hotels: 78,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Rajshahi_city_%283%29.jpg/2560px-Rajshahi_city_%283%29.jpg",
      color: "from-amber-500/30 to-orange-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Top Destinations
            </span>
            <br />
            <span className="text-xl sm:text-2xl text-slate-400 font-light mt-2 block">
              Explore Bangladesh's most captivating cities
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-max">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.08}s both`
              }}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl">
                
                
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  
                  <div className={`absolute inset-0 bg-gradient-to-b ${destination.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-cyan-400 flex items-center gap-1 border border-cyan-500/30">
                    <Hotel size={14} />
                    {destination.hotels} Hotels
                  </div>
                </div>

                
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {destination.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                      {destination.description}
                    </p>
                  </div>

                  
                  <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between group/link">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin size={14} />
                      Explore City
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="text-slate-600 group-hover/link:text-cyan-400 transition-all duration-300 transform group-hover/link:translate-x-1"
                    />
                  </div>
                </div>

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA
        <div className="mt-20 text-center">
          <button className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
            <span className="relative z-10 flex items-center gap-2 justify-center">
              Discover More Destinations
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div> */}
      </div>
    </div>
  );
}