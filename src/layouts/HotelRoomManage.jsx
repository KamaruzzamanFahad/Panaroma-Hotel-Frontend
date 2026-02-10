import { Camera, DollarSign, TrendingUp, Users, Bed, Calendar, Edit2, Trash2, Plus, X, Save, Search, Upload, Pencil } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function HotelRoomManage() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [roomImageFile, setRoomImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    room_number: '',
    room_type: 'Single',
    price_per_night: 0,
    description: '',
    status: true
  });

  const [hotelFormData, setHotelFormData] = useState({
    name: '',
    address: '',
    description: '',
    image: null
  });

  const accessToken = localStorage.getItem('access');

  const axiosConfig = {
    headers: {
      Authorization: `JWT ${accessToken}`,
    }
  };

 
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/hotels/');
      setHotels(response.data.results);
      if (response.data.results.length > 0 && !selectedHotel) {
        setSelectedHotel(response.data.results[0]);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast('Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

 
  const fetchRooms = async (hotelId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/hotels/${hotelId}/rooms/`);
      setRooms(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      fetchRooms(selectedHotel.id);
    }
  }, [selectedHotel]);

 
  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', hotelFormData.name);
      formDataToSend.append('address', hotelFormData.address);
      formDataToSend.append('description', hotelFormData.description);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await axios.post('/hotels/', formDataToSend, {
        headers: {
          Authorization: `JWT ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      toast('Hotel added successfully!');
      setIsHotelModalOpen(false);
      setHotelFormData({ name: '', address: '', description: '', image: null });
      setImageFile(null);
      fetchHotels();
    } catch (error) {
      console.error('Error adding hotel:', error);
      toast('Failed to add hotel');
    } finally {
      setLoading(false);
    }
  };

 
  const handleAddRoom = () => {
    if (!selectedHotel) {
      toast('Please select a hotel first');
      return;
    }
    setEditingRoom(null);
    setFormData({
      room_number: '',
      room_type: 'Single',
      price_per_night: 0,
      description: '',
      status: true
    });
    setRoomImageFile(null);
    setIsModalOpen(true);
  };

 
  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setFormData({
      room_number: room.room_number,
      room_type: room.room_type,
      price_per_night: room.price_per_night,
      description: room.description,
      status: room.status
    });
    setRoomImageFile(null);
    setIsModalOpen(true);
  };

 
  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`/hotels/${selectedHotel.id}/rooms/${roomId}/`, axiosConfig);
      toast('Room deleted successfully!');
      fetchRooms(selectedHotel.id);
    } catch (error) {
      console.error('Error deleting room:', error);
      toast('Failed to delete room');
    } finally {
      setLoading(false);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (editingRoom) {
 
        await axios.patch(
          `/hotels/${selectedHotel.id}/rooms/${editingRoom.id}/`,
          formData,
          axiosConfig
        );
        
 
        if (roomImageFile) {
          const imageFormData = new FormData();
          imageFormData.append('image', roomImageFile);
          await axios.post(
            `/hotels/${selectedHotel.id}/rooms/${editingRoom.id}/images/`,
            imageFormData,
            {
              headers: {
                Authorization: `JWT ${accessToken}`,
                'Content-Type': 'multipart/form-data',
              }
            }
          );
        }
        
        toast('Room updated successfully!');
      } else {
 
        const response = await axios.post(
          `/hotels/${selectedHotel.id}/rooms/`,
          formData,
          axiosConfig
        );
        
 
        if (roomImageFile && response.data.id) {
          const imageFormData = new FormData();
          imageFormData.append('image', roomImageFile);
          await axios.post(
            `/hotels/${selectedHotel.id}/rooms/${response.data.id}/images/`,
            imageFormData,
            {
              headers: {
                Authorization: `JWT ${accessToken}`,
                'Content-Type': 'multipart/form-data',
              }
            }
          );
        }
        
        toast('Room added successfully!');
      }
      
      setIsModalOpen(false);
      fetchRooms(selectedHotel.id);
    } catch (error) {
      console.error('Error saving room:', error);
      toast('Failed to save room');
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.room_number?.toString().includes(searchTerm.toLowerCase()) ||
    room.room_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
            <Bed className="w-6 h-6 text-purple-400" />
            Hotel Management 
          </h3>
          <button
            onClick={() => setIsHotelModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Hotel
          </button>
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Hotel</label>
          <select
            value={selectedHotel?.id || ''}
            onChange={(e) => {
              const hotel = hotels.find(h => h.id === parseInt(e.target.value));
              setSelectedHotel(hotel);
            }}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
          >
            <option value="">Choose a hotel...</option>
            {hotels.map(hotel => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name} - {hotel.address}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
            <Bed className="w-6 h-6 text-purple-400" />
            Room Management
            {selectedHotel && <span className="text-sm text-gray-400">({selectedHotel.name})</span>}
          </h3>
          <button
            onClick={handleAddRoom}
            disabled={!selectedHotel}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Add New Room
          </button>
        </div>

        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-400"
            />
          </div>
        </div>

        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {[1, 2, 3].map((i) => (
    <div
      key={i}
      className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600 shadow-lg"
    >
      <div className="p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gray-600 rounded-lg" />
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-600 rounded-lg" />
            <div className="w-8 h-8 bg-gray-600 rounded-lg" />
          </div>
        </div>

        <div className="h-6 bg-gray-600 rounded w-2/3 mb-3" />
        <div className="h-4 bg-gray-600 rounded w-full mb-4" />

        <div className="flex items-center justify-between">
          <div className="h-7 bg-gray-600 rounded w-24" />
          <div className="h-6 bg-gray-600 rounded-full w-20" />
        </div>
      </div>
    </div>
  ))}
</div>

          </div>
        )}

        
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600 hover:border-purple-500 transition-all shadow-lg hover:shadow-purple-500/20">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="text-5xl w-full flex flex-row flex-wrap gap-1 rounded-2xl">
                        {room.images.map((image, index) => (
                                <img className='h-10 w-10' src={image.image} alt="" />
                        ))}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      room.status 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {room.status ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-100 mb-2">Room #{room.room_number}</h4>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-400">Type: <span className="text-gray-300">{room.room_type}</span></p>
                    <p className="text-sm text-gray-400">Description: <span className="text-gray-300">{room.description}</span></p>
                    <p className="text-2xl font-bold text-gray-100">${room.price_per_night}<span className="text-sm text-gray-400">/night</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditRoom(room)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <Bed className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No rooms found</p>
          </div>
        )}
      </div>

      
      {isHotelModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-100">Add New Hotel</h3>
              <button
                onClick={() => setIsHotelModalOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddHotel} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hotel Name</label>
                <input
                  type="text"
                  required
                  value={hotelFormData.name}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                  placeholder="e.g., Grand Hotel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  required
                  value={hotelFormData.address}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, address: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                  placeholder="e.g., 123 Main St"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  required
                  value={hotelFormData.description}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                  rows="3"
                  placeholder="Hotel description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hotel Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsHotelModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Adding...' : 'Add Hotel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-100">
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Room Number</label>
                <input
                  type="number"
                  required
                  value={formData.room_number}
                  onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                  placeholder="e.g., 101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Room Type</label>
                <select
                  value={formData.room_type}
                  onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price per Night ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price_per_night}
                  onChange={(e) => setFormData({ ...formData, price_per_night: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                  rows="3"
                  placeholder="Room description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                >
                  <option value="true">Available</option>
                  <option value="false">Booked</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Room Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setRoomImageFile(e.target.files[0])}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : (editingRoom ? 'Update' : 'Add')} Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}