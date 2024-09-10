import React, { useState } from 'react';
import { useCreateReviewsMutation,useEditReviewMutation } from '../redux/api';
import { useNavigate ,useParams} from 'react-router-dom';


const ReviewForm = ({ token,review,product}) => {


  const reviewForm = {
    text: review?.text || "",
    rating: review?.rating || 1
  };

  const reviewData= review;
  console.log(reviewData);



  const [form, updateForm] = useState(reviewForm);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const [createReviews] = useCreateReviewsMutation();
  const [editReview] = useEditReviewMutation();
  const navigate = useNavigate();




  const handleChange = ({target}) => {
    setError(null);
    updateForm({...form, [target.name]: target.value});

  };

  const {text, rating} = form;




  const handleSubmit = async (event) => {
    event.preventDefault();
 

    if(rating==="" || text===""){
      setError("Please fill out review form");
      return;
    }


    const {error} = review
    ? await editReview({id: review.product_id, body:form, token}) : createReviews({id, body:form, token}) 

    if (error) {
      setError("Something went wrong, Please try again");
      return;
    }
    console.log(error);

    updateForm({...form, rating: parseInt(form.rating)});

    ///await createReviews({id, body:form, token})
    navigate(`/products/${id}`)
  };





  return (
    <section className="padding">
       <h2>Review Form</h2>
       <h2> {product ? `Edit review for ${product.name}` : "Create new Review"}</h2>
       {error && <p>{error}</p>}
    <form onSubmit={handleSubmit}>
    <div className="formDiv">
    <label>
      <h3>Review</h3>
      <textarea 
        placeholder="Write your review..." 
        name="text"
        value={form.text} 
        onChange={handleChange }
      />
      </label>

      <label>
      <h3>Rating</h3>
      <input 
        type="number" 
        placeholder="Rating (1-5)" 
        min="1" 
        max="5" 
        name="rating"
        value={form.rating} 
        onChange={handleChange }
      />
      </label>
      <div>
      <button onClick={handleSubmit}>{product ? "Update" : "Submit"}</button>

      </div>
      </div>
    </form>
    </section>
  );
};

export default ReviewForm;