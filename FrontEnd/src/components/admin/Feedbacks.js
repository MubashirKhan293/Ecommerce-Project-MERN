import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../admin/admin-styles/Feedbacks.css'; // Include a CSS file for styling
import AdminNavbar from '../admin/AdminNavbar'
const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/feedbacks', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Your Network is Unstable');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDeleteFeedback = async (id) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/feedbacks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
    } catch (err) {
      setError('Failed to delete feedback.');
    }
  };

  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
    <AdminNavbar/>
     <div className="feedback-list">
      <h2>Feedback Received</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <h3>{feedback.subject}</h3>
            <p><strong>Name:</strong> {feedback.name}</p>
            <p><strong>Email:</strong> {feedback.email}</p>
            <p><strong>Message:</strong> {feedback.message}</p>
            <button className="delete-button" onClick={() => handleDeleteFeedback(feedback._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default FeedbackList;
