import React from 'react';
import { Button, Card } from 'flowbite-react';
import { CheckCircle2, Users, Lightbulb, Building2 } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 mt-10">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-blue-600">Panaroma Hotel</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience luxury like never before. Our mission is to provide world-class hospitality and unforgettable experiences for every traveler.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <Card className="text-center p-6 border-none shadow-lg bg-blue-50 dark:bg-gray-800">
            <div className="flex justify-center mb-4">
              <Building2 className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">500+</h3>
            <p className="text-gray-600 dark:text-gray-400">Luxury Rooms</p>
          </Card>
          <Card className="text-center p-6 border-none shadow-lg bg-blue-50 dark:bg-gray-800">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">100k+</h3>
            <p className="text-gray-600 dark:text-gray-400">Happy Guests</p>
          </Card>
          <Card className="text-center p-6 border-none shadow-lg bg-blue-50 dark:bg-gray-800">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">25+</h3>
            <p className="text-gray-600 dark:text-gray-400">Awards Won</p>
          </Card>
          <Card className="text-center p-6 border-none shadow-lg bg-blue-50 dark:bg-gray-800">
            <div className="flex justify-center mb-4">
              <Lightbulb className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">15+</h3>
            <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
          </Card>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Our Story" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Founded in 2010, Panaroma Hotel began with a simple vision: to create a sanctuary where luxury meets comfort. What started as a small boutique hotel has grown into one of the most prestigious names in hospitality.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              We believe that every stay should be personal and every guest should feel at home. Our team is dedicated to exceeding your expectations and creating memories that last a lifetime.
            </p>
            <Button color="blue" size="lg">Learn More About Us</Button>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-10 md:p-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto italic">
            "To provide an unparalleled hospitality experience by combining luxury, comfort, and personalized service, ensuring every guest leaves with a story to tell."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
