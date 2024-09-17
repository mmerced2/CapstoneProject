import { useGetReviewsQuery } from "../redux/api";

function Reviews(token) {
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
  const averageRatings = Object.entries(productRatings || {}).map(
    ([product_id, { totalRating, count }]) => ({
      product_id,
      averageRating: totalRating / count,
    })
  );

  return { averageRatings, isLoading, error };
}

export default Reviews;
