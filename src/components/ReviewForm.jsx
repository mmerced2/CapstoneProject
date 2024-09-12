import React, { useState, useEffect } from "react";
import {
  useCreateReviewsMutation,
  useEditReviewMutation,
  useGetReviewsbyUserIdQuery,
} from "../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Rating, Typography } from "@mui/material";

const ReviewForm = ({ token, review, product }) => {
  const [form, updateForm] = useState({
    text: review?.text || "",
    rating: review?.rating || 1,
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [createReviews] = useCreateReviewsMutation();
  const [editReview] = useEditReviewMutation();
  const { refetch } = useGetReviewsbyUserIdQuery(
    { token },
    { refetchOnMountOrArgChange: true }
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (review) {
      updateForm({
        text: review.text || "",
        rating: review.rating || 1,
      });
    }
  }, [review]);

  const handleChange = (event, newValue) => {
    setError(null);
    updateForm((prevForm) => ({
      ...prevForm,
      rating: newValue,
    }));
  };

  const handleTextChange = (event) => {
    setError(null);
    const { value } = event.target;
    updateForm((prevForm) => ({
      ...prevForm,
      text: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.rating < 1 || form.rating > 5 || form.text.trim() === "") {
      setError("Please fill out the review form correctly.");
      return;
    }

    try {
      let response;

      if (review) {
        response = await editReview({
          id: review.id,
          body: form,
          product_id: review.product_id,
          token,
        });
      } else {
        response = await createReviews({
          id,
          body: form,
          product_id: id,
          token,
        });
      }

      if (response.error) {
        setError("Something went wrong, please try again.");
        console.log("API Error:", response.error);
      } else {
        setError(null);
        console.log(
          "Navigating to:",
          `/products/${review ? review.product_id : id}`
        );
        await refetch();
        navigate(`/products/${review ? review.product_id : id}`);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Unexpected error:", error);
    }
  };

  return (
    <section className="padding">
      <h2>{review ? "Edit Review" : "Create New Review"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <label>
            <h3>Review</h3>
            <textarea
              placeholder="Write your review..."
              name="text"
              value={form.text}
              onChange={handleTextChange}
            />
          </label>
          <label>
            <h3>Rating</h3>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="rating"
                value={form.rating}
                onChange={handleChange}
                precision={0.5}
              />
              <Typography sx={{ ml: 2 }}>{form.rating}</Typography>
            </Box>
          </label>
          <div>
            <button type="submit">{review ? "Update" : "Submit"}</button>
          </div>
          <div>
            <button type="button" onClick={() => navigate("/products/")}>
              Back To Products
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ReviewForm;