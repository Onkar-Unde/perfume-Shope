import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import "./Style/ShopAll.css"; 

function ShopAll() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  

    useEffect(() => {
        axios.get("http://localhost:5000/products/")
            .then(response => {
                console.log("API Response:", response.data); 
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    setError("Unexpected response format.");
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading images...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="image-gallery-con">
            {products.length > 0 ? (
                products.map((product) => (
                    product.images.map((image, index) => (
                        <img
                            key={`${product._id}-${index}`}
                            src={image}
                            alt={product.name}
                            className="gallery-image"
                            onClick={() => navigate(`/product/${product._id}`)} 
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
                        />
                    ))
                ))
            ) : (
                <div className="no-images">
                    <p>No images available</p>
                    <img src="/fallback.jpg" alt="No images" className="gallery-fallback" />
                </div>
            )}
        </div>
    );
}

export default ShopAll;
