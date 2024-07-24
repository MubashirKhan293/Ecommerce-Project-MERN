import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin-styles/Users.css';
import AdminNavbar from './AdminNavbar'
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Your Network is Unstable');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUsers = async (id) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      setUsers(users.filter(users => users._id !== id));
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <AdminNavbar/>
    <div className="user-list">
    {users.map((user, index) => (
      <div className="user-item" key={index}>
        <div className="user-info">
          <h3>{user.username}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> {user.password}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <button className="user-delete-button" onClick={()=> handleDeleteUsers(user._id)}>
          Delete
        </button>
      </div>
    ))}
  </div>
  </>
  );
};

export default UserTable;
