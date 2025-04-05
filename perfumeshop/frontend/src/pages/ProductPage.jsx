import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa'; // Import social icons
import ReviewForm from '../components/ReviewForm';
import ImageGallery from '../components/ImageGallery';;
import './ProductPage.css';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [selectedSize, setSelectedSize] = useState(''); // Track selected size

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));

        axios.get(`http://localhost:5000/reviews/${id}`)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!product) return <h2>Loading...</h2>;

    // Function to add product to cart
    const addToCart = (product, selectedSize) => {
        if (!selectedSize) {
            alert("Please select a size first.");
            return; // Don't proceed if no size is selected
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Check if the product with the same ID & Size already exists
        const existingProductIndex = cart.findIndex(item => item.name === product.name && item.size === selectedSize);
    
        if (existingProductIndex !== -1) {
            // If exists, just update the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // Otherwise, add new product to cart
            cart.push({ 
                id: product.id, 
                name: product.name, 
                price: product.price, 
                size: selectedSize, 
                image: product.images[0], 
                quantity: 1 
            });
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Product added to cart!");
    };

    const shareProduct = () => {
        const productUrl = window.location.href;
        const text = `Check out this amazing product: ${product.name} - ₹${product.price}!`;

        if (navigator.share) {
            navigator.share({
                title: product.name,
                text,
                url: productUrl
            }).catch(err => console.log('Error sharing:', err));
        }
    };

    return (
        <div className='product-page'>
            <h2 className='product-title'>{product.name}</h2>
            <div className='product-content'>
                {/* Image Gallery */}
                <div className="image-gallery">
                    <ImageGallery images={product.images} />
                </div>
                <div>
                    {/* Product Description */}
                    <p className='product-description'>{product.description}</p>
                    <p className="product-price"><strong>Price:</strong> ₹{product.price}</p>
                    
                    {/* Size Selector */}
                    <div className='size-container'>
                    <p className="product-sizes"><strong>Available Size:</strong></p>
                    <select 
                        value={selectedSize} 
                        onChange={(e) => setSelectedSize(e.target.value)} 
                        className="size-selector"
                    >
                        <option value="">Select Size</option>
                        {product.sizes.map((size, index) => (
                            <option key={index} value={size}>{size}</option>
                        ))}
                    </select>
                    </div>
                    {/* Add to Cart Button */}
                    <button className="shop-btn" onClick={() => addToCart(product, selectedSize)}>
                        <FaShoppingCart className="cart-icon" /> Add to Cart
                    </button>
                </div>
            </div>

            {/* Social Media Share Buttons */}
            <div className="social-share">
                <h3>Share this product:</h3>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="social-icon" />
                </a>
                <a href={`https://twitter.com/intent/tweet?text=Check+out+this+product:+${product.name}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="social-icon" />
                </a>
                <a href={`https://api.whatsapp.com/send?text=Check+out+this+product:+${product.name} - ${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="social-icon" />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${product.name}`} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="social-icon" />
                </a>
                <button className="share-btn" onClick={shareProduct}>Share</button>
            </div>

            {/* Reviews Section */}
            <div className='reviews-section'>
                <h3>Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review">
                            <p className="reviewer-name"><strong>{review.reviewer}</strong></p>
                            <p className="review-comment">{review.comment}</p>
                            <div className="review-rating">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} className="star" />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='default-p'>No reviews yet. Be the first to review!</p>
                )}
                <ReviewForm productId={id} />
            </div>
        </div>
        
    );
}

export default ProductPage;
