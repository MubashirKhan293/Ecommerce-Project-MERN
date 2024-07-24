import React, { useState,useEffect } from 'react';
import '../../styles/Categories.css';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';

function CommercialGrills() {
  const navigate = useNavigate();  
  const location = useLocation(); // Get the current location
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('/commercial-grills'); 
  useEffect(()=>{
    axios.get(`http://localhost:5000/products`)
    .then(response => {
      setData(response.data);
    }).catch(error =>{
      console.log("error fetching data", error)
    }
    )
  },[]);
  useEffect(() => {
    // Update active category based on current path
    setActiveCategory(location.pathname);
  }, [location]);

  const handleViewDetailsClick = (product) => {
    navigate('/product-details', { state: { product } });
  };
  
  const commercialGrills= data.filter(item => item.category === "Commercial Grills");

  const categories = ['Ovens', 'Perfumes', 'Commercial-Grills', 'Coffee-Equipment'];

  return (
    <>
      <Navbar/>
      <div className="categories-page">
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul className="category-list">
            {categories.map((category, index) => (
              <li key={index}>
                <a
                  href={`/${category.toLowerCase()}`}
                  className={activeCategory === `/${category.toLowerCase()}` ? 'active' : ''}
                >
                  <div>{category}</div>
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="category-content">
          <div className="item-grid">
            {commercialGrills.map(item => (
              <div className="item" key={item.id}>
                <img 
                src={`http://localhost:5000/api/${item.image}`}
                 alt={item.name} />
                <div className="item-details">
                <div className='item-d-heading'>
                  <h3>{item.name}</h3>
                  </div>
                  <div className='item-d-column'>
                  <p>price: {item.price}</p>
                  </div>
                  <button className="add-to-cart" onClick={() => handleViewDetailsClick(item)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommercialGrills;
