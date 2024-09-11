import React from "react";
import { useGetReviewsQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";

export default function Reviews({ token }) {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetReviewsQuery({ token });
  const reviews = data?.reviews;

  // Aggregate ratings by product_id
  const productRatings = reviews?.reduce((acc, review) => {
    const { product_id, rating } = review;

    if (!acc[product_id]) {
      acc[product_id] = { totalRating: 0, count: 0 };
    }

    acc[product_id].totalRating += rating;
    acc[product_id].count += 1;

    return acc;
  }, {});

  // Calculate average ratings
  const averageRatings = Object.entries(productRatings || {}).map(([product_id, { totalRating, count }]) => ({
    product_id,
    averageRating: totalRating / count,
  }));

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading reviews</p>}
      {averageRatings &&
        averageRatings.map((product) => (
          <div className="review_card" key={product.product_id}>
            <Card sx={{ maxWidth: 370 }}>
              <CardContent>
                <Typography variant="h6">
                  Product ID: {product.product_id}
                </Typography>
                <Typography variant="body2">
                  Average Rating: {product.averageRating.toFixed(1)}
                </Typography>
              </CardContent>

            </Card>
          </div>
        ))}
    </>
  );
}
