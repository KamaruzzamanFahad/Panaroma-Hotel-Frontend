import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewPage = ({ hotelId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    rating: '',
    comment: ''
  });

  const accessToken = localStorage.getItem('access');

 
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/my-hotel-reviews/?hotel_id=${hotelId}`, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hotelId) {
      fetchReviews();
    }
  }, [hotelId]);

 
  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/hotels/${hotelId}/reviews/`,
        {
          rattings: formData.rating ? parseInt(formData.rating) : null,
          comment: formData.comment
        },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      toast('Review added successfully!');
      setFormData({ rating: '', comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error adding review:', error);
      toast('Failed to add review');
    }
  };

 
  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/hotels/${hotelId}/reviews/${editingId}/`,
        {
          rattings: formData.rating ? parseInt(formData.rating) : null,
          comment: formData.comment
        },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      toast('Review updated successfully!');
      setEditingId(null);
      setFormData({ rating: '', comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast('Failed to update review');
    }
  };

 
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await axios.delete(`/hotels/${hotelId}/reviews/${reviewId}/`, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });
      toast('Review deleted successfully!');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast('Failed to delete review');
    }
  };

 
  const handleEdit = (review) => {
    setEditingId(review.id);
    setFormData({
      rating: review.rattings || '',
      comment: review.comment || ''
    });
  };

 
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ rating: '', comment: '' });
  };

  return (
    <div className="min-h-auto bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Hotel Reviews</h1>

        

        
        <h2 className="text-2xl font-semibold mb-6">Your Reviews</h2>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            {
                accessToken ? (
                    <p className="text-gray-400">No reviews yet. Add your first review above!</p>
                ) : (
                    <p className="text-gray-400">Please login to add a review</p>
                )
            }
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    {review.rattings && (
                      <div className="mb-3">
                        <span className="font-semibold text-gray-300">Rating: </span>
                        <span className="text-yellow-400">
                          {'⭐'.repeat(review.rattings)}
                        </span>
                        <span className="ml-2 text-gray-400">({review.rattings}/5)</span>
                      </div>
                    )}
                    <p className="text-gray-200 mb-3 leading-relaxed">{review.comment}</p>
                    {review.created_at && (
                      <p className="text-sm text-gray-500">
                        Posted on: {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(review)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        
        {
            accessToken && (
                <div className="bg-gray-800 mt-5 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">
            {editingId ? 'Edit Review' : 'Add New Review'}
          </h2>
          <form onSubmit={editingId ? handleUpdateReview : handleAddReview}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Rating (1-5):
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
                placeholder=""
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Comment:
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400 min-h-[120px]"
                placeholder="Write your review..."
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {editingId ? 'Update Review' : 'Add Review'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
            )
        }
      </div>
    </div>
  );
};

export default ReviewPage;