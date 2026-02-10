import React, { useEffect, useState } from 'react'
import LuxuryHeroSection from '../components/Hero'
import DestinationGrid from '../components/Topdastanitaions'
import TopPiksHotel from '../components/TopPiksHotel'
import MostBookedHotels from '../components/MostBoockedHotel'
import Testimonials from '../components/Testimonial'
import axios from 'axios'

const Home = () => {
  const is_authenticated = localStorage.getItem("access");
  const [hotel,setHotel] = useState([]);

  useEffect(() => {
    const fetchHotel = async () => {
      const response = await axios.get("hotels/");
      const data = response.data;
      setHotel(data);
    };
    fetchHotel();
  }, []);
  
  return (
    <div>
        <LuxuryHeroSection is_authenticated={is_authenticated} />
        
        <MostBookedHotels hotel={hotel} />
        <TopPiksHotel hotel={hotel} />
        <DestinationGrid />
        
        <Testimonials />
    </div>
  )
}

export default Home