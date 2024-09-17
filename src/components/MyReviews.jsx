import React, { useState } from "react";
import {
  useGetReviewsbyUserIdQuery,
  useDeleteReviewMutation,
} from "../redux/api";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  Grid,
} from "@mui/material";
import ReviewForm from "./ReviewForm";
import { useNavigate } from "react-router-dom";

export default function MyReviews({ id, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [deleteReview] = useDeleteReviewMutation();
  const navigate = useNavigate();

  const handleDelete = async (review_id) => {
    try {
      await deleteReview({ id: review_id, token });
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useGetReviewsbyUserIdQuery({ token });
  const reviews = data?.review;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oops! Something went wrong!</p>;
  }

  if (isEditing) {
    const reviewToEdit = reviews.find((review) => review.id === editReviewId);
    return (
      <ReviewForm
        review={reviewToEdit}
        token={token}
        setIsEditing={setIsEditing}
      />
    );
  }

  return (
    <div>
      <Typography variant="h4" color="black" gutterBottom>
        My Reviews
      </Typography>

      <Grid container spacing={3}>
        {reviews &&
          reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Card sx={{ maxWidth: 370 }}>
                <CardMedia
                  component="img"
                  alt={review.products.name}
                  height="350"
                  image={review.products.img_url}
                />

                <CardContent>
                  <Typography variant="h6">{review.products.name}</Typography>
                  <Typography variant="subtitle1">{review.products.artist}</Typography>
                  <Typography variant="subtitle1">
                    <Rating value={review.rating} readOnly precision={0.5} />
                  </Typography>
                  <Typography variant="body2">Review: {review.text}</Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => navigate("/products/")}>Back</Button>
                  <Button onClick={() => handleDelete(review.id)}>Delete Review</Button>
                  <Button
                    onClick={() => {
                      setEditReviewId(review.id);
                      setIsEditing(true);
                    }}
                  >
                    Edit Review
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
