import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "../styles/Dashboard.css";
import Navbar from "./Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import back5 from "../images/back5.jpg";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log("error fetching data", error);
      });
  }, []);

  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/ovens");
  };

  const handleProductClick = () => {
    navigate("/ovens");
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="home" style={{ backgroundImage: `url(${back5})` }}>
      <Navbar />
      <div className="home-content">
        <h1>Upgrade Your Kitchen and Home</h1>
        <h3>Enhance your space with our top products.</h3>
        <button className="order-button" onClick={handleOrderClick}>
          Order Now
        </button>
        <div className="product-slider">
          <Slider {...settings}>
            {data.map((product) => (
              <div
                key={product.id}
                className="product-item-home"
                onClick={handleProductClick}
              >
                <img
                  src={`http://localhost:5000/api/${product.image}`}
                  alt={product.name}
                  className="product-image-home"
                />
                <div className="product-details">
                  <div className="product-heading">
                    <h3 className="product-name1">{product.name}</h3>
                  </div>
                  <p className="product-price1">Price: {product.price}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
