import React from "react";
import styled from "styled-components";

const ReviewTile = ({ review }) => {
  return (
    <Review>
      <ReviewAuthor>{review.author}</ReviewAuthor>
      <ReviewDate>{review.date}</ReviewDate>
      <ReviewRating>{review.rating}</ReviewRating>
      <ReviewBody>{review.body}</ReviewBody>
    </Review>
  );
};

const Review = styled.div`
  border: 2px solid black;
`;

const ReviewAuthor = styled.div``;

const ReviewDate = styled.div``;

const ReviewRating = styled.div``;

const ReviewBody = styled.div``;

export default ReviewTile;
