import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style/ProductCard.css";
function ProductCard({ product }) {
    const navigate = useNavigate();

    // ✅ Ensure product and images exist
    const imageUrl = product?.images?.[0] || "https://via.placeholder.com/150";

    return (
       
        <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
            <img
                src={imageUrl}
                alt={product?.name || "Product Image"}
                onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <h3>{product?.name || "No Product Name"}</h3>
            <p>{product?.description}</p>
            <p>{product?.price ? `₹${product.price}` : "Price Not Available"}</p>
        </div>
    );
}

export default ProductCard;
