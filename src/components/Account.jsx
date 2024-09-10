import { useGetUserQuery, useGetReviewsbyUserIdQuery } from "../redux/api";
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
import { Avatar } from '@mui/material';
import MyReviews from "./MyReviews";

export default function Account({ token }) {
  const { data, error, isLoading } = useGetUserQuery(token);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  if (data?.user) {
    const { username, email, first_name, last_name } = data.user;


    return (
      <section className="padding account">
        <Typography variant="h5">Account Information</Typography>
        <Grid
          display="flex"
          justifyContent="center"
          align-items="center"
          size="grow"
        >
          <Card sx={{ maxWidth: 300 }}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              size="grow"
            >
              <Avatar
                src="/broken-image.jpg"
                sx={{ width: 56, height: 56 }}
                alignItems="center"
              />
            </Grid>

            <CardContent>
              <Typography variant="h6">
                Name: {`${first_name}`} {` ${last_name}`}
              </Typography>
              <Typography variant="h6">Username: {username}</Typography>
              <Typography variant="h6">Email: {email}</Typography>
            </CardContent>
          </Card>
   
        </Grid>

        <section>
   


      </section>

      </section>


    );
  }

  return (
    <section>
      <h3>Not found!</h3>
    </section>
  );
}
