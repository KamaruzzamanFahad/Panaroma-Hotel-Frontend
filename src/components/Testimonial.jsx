import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      title: "Best booking experience ever",
      content: "The hotel booking platform made it incredibly easy to find and reserve accommodations across Bangladesh. The seamless integration with payment systems and instant confirmations were fantastic.",
      author: "Sarah Ahmed",
      position: "Travel Blogger at Bangladesh Travels",
      image: "https://i.pravatar.cc/150?img=1",
      height: "h-64"
    },
    {
      id: 2,
      title: "Excellent customer support",
      content: "I had a query about my reservation at Cox's Bazar hotel and the support team responded within minutes. Their professionalism and knowledge about local hotels was impressive.",
      author: "Rahul Kumar",
      position: "Tourism Manager at Local Agency",
      image: "https://i.pravatar.cc/150?img=2",
      height: "h-72"
    },
    {
      id: 3,
      title: "Comprehensive hotel database",
      content: "The platform offers the most extensive collection of hotels across all regions of Bangladesh. From luxury resorts in Dhaka to budget hostels in Sylhet, everything is available in one place.",
      author: "Fatima Hassan",
      position: "Travel Consultant at Explore BD",
      image: "https://i.pravatar.cc/150?img=3",
      height: "h-64"
    },
    {
      id: 4,
      title: "Transparent pricing and deals",
      content: "No hidden charges, just honest pricing. I've booked multiple hotels and every price I saw was exactly what I paid. The seasonal offers are fantastic too.",
      author: "Mohammad Khan",
      position: "Business Traveler at Global Corp",
      image: "https://i.pravatar.cc/150?img=4",
      height: "h-80"
    },
    {
      id: 5,
      title: "Perfect for group bookings",
      content: "Organized a family reunion across three different cities in Bangladesh. The platform's group booking feature allowed us to coordinate everything perfectly. Highly recommended!",
      author: "Nadia Iqbal",
      position: "Event Coordinator at Premium Events",
      image: "https://i.pravatar.cc/150?img=5",
      height: "h-72"
    },
    {
      id: 6,
      title: "Real reviews that matter",
      content: "The authentic customer reviews helped me choose the right hotel. Every review I read matched my actual experience. The detailed photos and ratings are invaluable.",
      author: "Arjun Das",
      position: "Hotel Consultant at Stay Smart",
      image: "https://i.pravatar.cc/150?img=6",
      height: "h-64"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden  pb-20">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What our customers say
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-5xl mx-auto">
            Discover what our satisfied customers say about their booking experience and hotel stays across Bangladesh 
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
              }}
 
            >
              <div className="h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl p-6 sm:p-8 hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {testimonial.title}
                </h3>

                
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed flex-grow mb-6">
                  "{testimonial.content}"
                </p>

                
                <div className="border-t border-slate-700/50 pt-4 mt-auto">
                  
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full border-2 border-cyan-500/30 object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {testimonial.author}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-base sm:text-lg mb-6">
            Ready to book your next stay in Bangladesh?
          </p>
          <button className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 inline-flex items-center gap-2">
            <span className="relative z-10">Start Exploring Hotels</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
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