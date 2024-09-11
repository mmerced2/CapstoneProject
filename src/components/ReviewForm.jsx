import React, { useState, useEffect } from 'react';
import { useCreateReviewsMutation, useEditReviewMutation ,useGetReviewsbyUserIdQuery} from '../redux/api';
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
  const {refetch} = useGetReviewsbyUserIdQuery({ token }, { refetchOnMountOrArgChange: true }); // Refetch data
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
      let response;
  
      if (review) {
        response = await editReview({ id: review.id , body: form, product_id: review.product_id, token });
      } else {
        response = await createReviews({ id, body: form, product_id: review.product_id,  token });
      }
  
      // Check for errors
      if (response.error) {
        setError("Something went wrong, please try again");
        console.log("API Error:", response.error); 
      } else {
        setError(null); 
        updateForm({ ...form, rating: parseInt(form.rating, 5)}, review.product_id); 

        console.log("Navigating to:", `/products/${review.product_id}`); 
        await refetch();
       navigate(`/products/${review.product_id}`);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Unexpected error:", error); 
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
          <div>
            <button onClick={() => navigate("/products/")}> Back To Products</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ReviewForm;
