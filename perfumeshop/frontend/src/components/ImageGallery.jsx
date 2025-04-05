import React from 'react';
import './Style/ImageGallery.css';
function ImageGallery({ images }) {
    return (
        <div className="image-gallery">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index+1}`} />
            ))}
        </div>
    );
}

export default ImageGallery;
