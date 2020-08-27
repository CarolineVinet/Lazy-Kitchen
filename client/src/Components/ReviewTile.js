import React from "react";
import styled from "styled-components";

const ReviewTile = ({ review }) => {
  return (
    <Review>
      <Top>
        <ReviewAuthor>Review left by {review.author}</ReviewAuthor>
        <ReviewRating>{review.rating}</ReviewRating>
      </Top>
      <Bottom>
        <ReviewDate>{review.date}</ReviewDate>
        <ReviewBody>{review.body}</ReviewBody>
      </Bottom>
    </Review>
  );
};

const Review = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
`;

const Top = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ReviewAuthor = styled.div`
  font-size: 18px;
  font-style: italic;
`;

const ReviewRating = styled.div``;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewDate = styled.div`
  text-align: right;
`;

const ReviewBody = styled.div`
  text-align: left;
`;

export default ReviewTile;
