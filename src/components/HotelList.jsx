import { useEffect, useState } from "react";
import TopPiksHotel from "./TopPiksHotel"

const HotelList = () => {
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
            <TopPiksHotel hotel={hotel} />
        </div>
    )
}

export default HotelList
