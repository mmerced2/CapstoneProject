import React, { useState } from "react";
import {
  useGetReviewsbyUserIdQuery,
  useEditReviewMutation,
  useDeleteReviewMutation,
} from "../redux/api";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReviewForm from "./ReviewForm";
import { useNavigate } from "react-router-dom";


export default function MyReviews({ id, token }) {

  let review = {};
  const [isEditing, setIsEditing] = useState(false);
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
console.log(reviews);

if (reviews) {
  review = reviews[0];
  console.log(review)

}
if (isEditing) {
  return (
  <ReviewForm review={review} token={token} setIsEditing={setIsEditing}/>

);}

if (isLoading) {
  return <p>Loading...</p>
}
  





  return (
    <>

      {isLoading ? <p>Loading...</p> : <span />}
      {error ? <p>Oops! Something went wrong!</p> : <span />}
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
                {/* <Button onClick={() => navigate(`/products/${review.product_id}/reviewform`)}>Edit Review </Button>   */}
                <Button onClick={() => setIsEditing(true) }>
                  Edit Review{" "}
                </Button> 
              </CardActions>
            </Card>
          </div>
        ))}
    </>
  );
}
