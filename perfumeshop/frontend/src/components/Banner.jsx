import React, { useState, useEffect } from "react";
import "./Style/Banner.css";
import banner1 from "./images/banner1.jpg";
import banner2 from "./images/banner2.jpg";
import banner3 from "./images/banner3.jpg";

const images = [banner1, banner2, banner3];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <div className="banner-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="banner-slide">
            <img src={image} alt={`Banner ${index + 1}`} className="banner-img" />
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
