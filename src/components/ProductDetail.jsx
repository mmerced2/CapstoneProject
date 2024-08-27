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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

///not finished

function ProductDetail({ token }) {
  const params = useParams();
  const id = params.id;
  console.log("product id from params:", id);
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
              <Button onClick={() => navigate("/products/")}>
                {" "}
                Add to Cart{" "}
              </Button>
              <Button onClick={() => navigate("/products/")}>
                {" "}
                Leave A Review{" "}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>

    //   <div>
    //     <a onClick={() =>setproductSelected(null)}>Back</a>
    //     <div>
    //         <h2>{name}</h2>
    //         <img src={img_url}/>
    //         <p>Product Type: {product_type}</p>
    //         <p>Description: {description}</p>
    //         <button>Add To Cart</button>
    //         <button>Leave a Review</button>
    //     </div>
    //   </div>
  );
}

export default ProductDetail;
