import { useEffect, useState } from "react";
import TopPiksHotel from "./TopPiksHotel"
import axios from "axios";
import { useLocation } from "react-router";

const HotelList = () => {
  const [hotel, setHotel] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchHotel = async () => {
      const response = await axios.get(`hotels/${search}`);
      const data = response.data;
      setHotel(data);
    };
    fetchHotel();
  }, [search]);

    return (
        <div>
            <TopPiksHotel pagination={true} hotel={hotel} />
        </div>
    )
}

export default HotelList
