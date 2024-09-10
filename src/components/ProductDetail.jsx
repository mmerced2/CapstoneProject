import { useGetProductsbyIdQuery } from "../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import React from "react";



function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProductsbyIdQuery(id);
  

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ margin: 5 }}>
      {error && !data && <p>Failed to load Product.</p>}
      <Grid container justifyContent="center">
        <Grid item>
          <Card sx={{ maxWidth: 370 }}>
            <CardMedia
              component="img"
              alt={data.product.name}
              height="500"
              image={data.product.img_url}
            />

            <CardContent>
              <Typography variant="h6">{data.product.name}</Typography>
              <Typography variant="h6">{data.product.product_type}</Typography>
              <Typography variant="h8">{data.product.description}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate("/products/")}> Back </Button>
              <Button onClick={() => navigate(`/products/${data.product.id}/reviewform`)}>
                {" "}
                Leave A Review{" "}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>

  );
}

export default ProductDetail;
