import React, { useState } from "react";
import {
  useGetReviewsbyUserIdQuery,
  useDeleteReviewMutation
} from "../redux/api";
import { useParams } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Button, Typography } from '@mui/material';
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
    const reviewToEdit = reviews.find(review => review.id === editReviewId);
    return (
      <ReviewForm review={reviewToEdit} token={token} setIsEditing={setIsEditing} />
    );
  }

  return (
    <>
    <Typography variant="h4">My Reviews</Typography>
    
      {reviews &&
        reviews.map((review) => (
          <div className="review_card" key={review.id}>
            <Card sx={{ maxWidth: 370 }}>
              <CardMedia
                component="img"
                alt={review.products.img_url}
                height="500"
                image={review.products.img_url}
              />

              <CardContent>
                <Typography variant="h6">
                  Product: {review.products.name}
                </Typography>
             
                <Typography variant="h6">
                  Review: {review.text}
                </Typography>
                <Typography variant="h6">Rating: {review.rating}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => navigate("/products/")}> Back </Button>
                <Button onClick={() => handleDelete(review.id)}>
                  Delete Review{" "}
                </Button>
                <Button onClick={() => { 
                  setEditReviewId(review.id);
                  setIsEditing(true);
                }}>
                  Edit Review{" "}
                </Button> 
              </CardActions>
            </Card>
          </div>
        ))}
    </>
  );
}
