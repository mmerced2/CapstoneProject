import React, { useState, useEffect } from "react";
import {
  useCreateReviewsMutation,
  useEditReviewMutation,
  useGetReviewsbyUserIdQuery,
} from "../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const ReviewForm = ({ token, review, product }) => {
  const [form, updateForm] = useState({
    text: review?.text || "",
    rating: review?.rating || 1,
  });
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const { id } = useParams();
  const [createReviews] = useCreateReviewsMutation();
  const [editReview] = useEditReviewMutation();
  const { refetch } = useGetReviewsbyUserIdQuery({ token }, { refetchOnMountOrArgChange: true });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuthStatus = async () => {
      if (!token) {
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();

    if (review) {
      updateForm({
        text: review.text || "",
        rating: review.rating || 1,
      });
    }
  }, [review, token]);

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
        console.log("Navigating to:", `/myreviews/products/${review ? review.product_id : id}`);
        await refetch();
        navigate(`/products/${review ? review.product_id : id}`);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Unexpected error:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" color="black" gutterBottom>
          Please log in to leave a review
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Log In
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" color="black" gutterBottom>
        {review ? "Edit Review" : "Create New Review"}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Review
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Write your review..."
            name="text"
            value={form.text}
            onChange={handleTextChange}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Rating
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="rating"
              value={form.rating}
              onChange={handleChange}
              precision={0.5}
            />
            <Typography sx={{ ml: 2 }}>{form.rating}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" type="submit">
            {review ? "Update" : "Submit"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/products/")}
          >
            Back To Products
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
