import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating'; 
import { useGetProductsQuery } from '../redux/api';
import { useNavigate } from 'react-router-dom';
import Reviews from './Reviews'; 

function ProductList({ token }) {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProductsQuery(token);
  const { averageRatings, isLoading: reviewsLoading, error: reviewsError } = Reviews(token);

  const products = data?.products;



  // Create a map of average ratings for quick lookup
  const ratingsMap = averageRatings?.reduce((acc, { product_id, averageRating }) => {
    acc[product_id] = averageRating;
    return acc;
  }, {});

  return (
    <>
      <Typography variant="h4" align="center"   color="black">
        Product List
      </Typography>
      {isLoading && <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '2rem' }} />}
      {error && <Typography color="error" align="center">Oops! Something went wrong!</Typography>}
      {reviewsLoading && <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '2rem' }} />}
      {reviewsError && <Typography color="error" align="center">Error loading reviews</Typography>}
      <Grid container spacing={4} justifyContent="center">
        {products && products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
              <CardMedia
                component="img"
                height="350"
                image={product.img_url}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="h6">Artist: {product.artist}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Product Type: {product.product_type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Description: {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Average Rating: {ratingsMap[product.id] ? (
                    <Rating value={ratingsMap[product.id]} readOnly />
                  ) : (
                    'No ratings yet'
                  )}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate("/products/" + product.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;
