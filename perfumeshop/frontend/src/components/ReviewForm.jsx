import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa"; // Importing star icons
import "./Style/ReviewForm.css"; // Ensure correct path to the CSS file

function ReviewForm({ productId }) {
    const [review, setReview] = useState({ reviewer: "", comment: "", rating: 5 });

    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleRating = (ratingValue) => {
        setReview({ ...review, rating: ratingValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/reviews", { ...review, productId });
        setReview({ reviewer: "", comment: "", rating: 5 });
        alert("Review Submitted!");
    };

    return (
        <form className="review-form" id="review-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="reviewer"
                id="reviewer-name"
                className="review-input"
                placeholder="Your Name"
                value={review.reviewer}
                onChange={handleChange}
                required
            />
            <textarea
                name="comment"
                id="review-comment"
                className="review-textarea"
                placeholder="Your Review"
                value={review.comment}
                onChange={handleChange}
                required
            />
            
            {/* Star Rating System */}
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        size={30}
                        className={`star ${star <= review.rating ? "selected" : ""}`}
                        onClick={() => handleRating(star)}
                    />
                ))}
            </div>

            <button type="submit" className="review-submit-btn" id="submit-review">
                Submit Review
            </button>
        </form>
    );
}

export default ReviewForm;
