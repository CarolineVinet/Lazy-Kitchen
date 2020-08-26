import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { ReviewsContext } from "./ReviewsContext";

const ReviewSection = ({ recipeId }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [reviewBody, setReviewBody] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const { reviews, setReviews } = useContext(ReviewsContext);
  return (
    <LeaveReviewDiv>
      <ReviewInput
        rows="4"
        cols="40"
        placeholder="Write your review here!"
        onChange={(event) => {
          setReviewBody(event.target.value);
        }}
      ></ReviewInput>
      <RatingDiv>
        <p>Your Rating : </p>
        <div>
          <input
            onChange={() => {
              setRating(1);
            }}
            type="radio"
            name="rating"
          ></input>
          1
        </div>
        <div>
          <input
            onChange={() => {
              setRating(2);
            }}
            type="radio"
            name="rating"
          ></input>
          2
        </div>
        <div>
          <input
            onChange={() => {
              setRating(3);
            }}
            type="radio"
            name="rating"
          ></input>
          3
        </div>
        <div>
          <input
            onChange={() => {
              setRating(4);
            }}
            type="radio"
            name="rating"
          ></input>
          4
        </div>
        <div>
          <input
            onChange={() => {
              setRating(5);
            }}
            type="radio"
            name="rating"
          ></input>
          5
        </div>
      </RatingDiv>
      <Button
        onClick={() => {
          fetch("/addreview", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              author: currentUser.username,
              recipeId: recipeId,
              body: reviewBody,
              rating: rating,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setReviews([...reviews, data]);
            });
        }}
      >
        Submit
      </Button>
    </LeaveReviewDiv>
  );
};

const LeaveReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: center;
  width: 100%;
`;

const ReviewInput = styled.textarea`
  border: 1px #00000036 solid;
  resize: none;
  padding-left: 5px;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const RatingDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button``;

export default ReviewSection;
