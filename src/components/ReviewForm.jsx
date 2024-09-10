import React, { useState, useEffect } from 'react';
import { useCreateReviewsMutation, useEditReviewMutation } from '../redux/api';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewForm = ({ token, review, product }) => {
  const [form, updateForm] = useState({
    text: review?.text || "",
    rating: review?.rating || 1
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [createReviews] = useCreateReviewsMutation();
  const [editReview] = useEditReviewMutation();
  const navigate = useNavigate();

  // Update form state when review prop changes
  useEffect(() => {
    if (review) {
      updateForm({
        text: review.text || "",
        rating: review.rating || 1
      });
    }
  }, [review]);

  console.log(review);

  const handleChange = ({ target }) => {
    setError(null);
    updateForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate form fields
    if (form.rating === "" || form.text === "") {
      setError("Please fill out the review form");
      return;
    }
  
    try {
      // Make the API call
      let response;
  
      if (review) {
        response = await editReview({ id: review.product_id, body: form, token });
      } else {
        response = await createReviews({ id, body: form, token });
      }
  
      // Check for errors
      if (response.error) {
        setError("Something went wrong, please try again");
        console.log("API Error:", response.error); // Debugging
      } else {
        // Success case
        setError(null); // Clear any previous errors
        updateForm({ ...form, rating: parseInt(form.rating, 10) }); // Optional: Update form if needed
        console.log("Navigating to:", `/products/${id}`); // Debugging
        navigate(`/products/${id}`);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Unexpected error:", error); // Debugging
    }
  };

  return (
    <section className="padding">
      <h2>Review Form</h2>
      <h2>{review? "Edit review" : "Create new Review"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <label>
            <h3>Review</h3>
            <textarea
              placeholder="Write your review..."
              name="text"
              value={form.text}
              onChange={handleChange}
            />
          </label>
          <label>
            <h3>Rating</h3>
            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              name="rating"
              value={form.rating}
              onChange={handleChange}
            />
          </label>
          <div>
            <button type="submit">{review? "Update" : "Submit"}</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ReviewForm;
