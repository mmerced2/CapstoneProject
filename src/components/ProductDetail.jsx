import { useGetProductsbyIdQuery, useGetReviewsbyProductIdQuery } from "../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button
} from "@mui/material";
import React from "react";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get product details
  const { data: productData, isLoading: productLoading, error: productError } = useGetProductsbyIdQuery(id);
  
  // Get reviews for the product
  const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError } = useGetReviewsbyProductIdQuery(id);

  if (productLoading || reviewsLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (productError) {
    return <Typography>Error: {productError.message}</Typography>;
  }

  if (reviewsError) {
    return <Typography>Error: {reviewsError.message}</Typography>;
  }

  const reviews = reviewsData?.review ;

  return (
    <Box sx={{ margin: 5 }}>
      {productError && !productData && <p>Failed to load Product.</p>}
      <Grid container justifyContent="center">
        <Grid item>
          <Card sx={{ maxWidth: 370 }}>
            <Typography variant="h4"><strong> {productData.product.name}</strong></Typography>
            <CardMedia
              component="img"
              alt={productData.product.name}
              height="350"
              image={productData.product.img_url}
            />

            <CardContent>
              <Grid>
                <Typography variant="h8"><strong> Artist: </strong> {productData.product.artist}</Typography>
              </Grid>
              <Grid>
                <Typography variant="h8"><strong> Category:</strong> {productData.product.category}</Typography>
              </Grid>
              <Grid>
                <Typography variant="h8"><strong> Type:</strong> {productData.product.product_type}</Typography>
              </Grid>
              <Grid>
                <Typography variant="h8"><strong> Description:</strong> {productData.product.description}</Typography>
              </Grid>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate("/products/")}>Back to Products</Button>
              <Button onClick={() => navigate(`/products/${productData.product.id}/reviewform`)}>Leave A Review</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h4"  color="black"> <strong> Reviews:</strong></Typography>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Box key={review.id} sx={{ marginBottom: 2 }}>
              <Typography variant="h5" color="black"><strong>Rating:</strong> {review.rating}</Typography>
              <Typography variant="h5" color="black">{review.text}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No reviews yet.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default ProductDetail;
