import React from "react";
import { Card, CardContent, Grid, Typography, Avatar } from "@mui/material";
import { useGetUserQuery } from "../redux/api";

export default function Account({ token }) {
  const { data, error, isLoading } = useGetUserQuery(token);

  if (isLoading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {error.message}
      </Typography>
    );
  }

  if (data?.user) {
    const { username, email, first_name, last_name } = data.user;

    return (
      <section style={{ padding: "2rem" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Account Information
        </Typography>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                >
                  <Grid item>
                    <Avatar
                      src="/broken-image.jpg"
                      sx={{ width: 80, height: 80 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      Name: {`${first_name} ${last_name}`}
                    </Typography>
                    <Typography variant="h6">Username: {username}</Typography>
                    <Typography variant="h6">Email: {email}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    );
  }

  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h6">Not found!</Typography>
    </section>
  );
}
