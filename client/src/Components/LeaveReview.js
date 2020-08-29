import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { ReviewsContext } from "./ReviewsContext";

import "../stars.css";

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
        value={reviewBody}
        onChange={(event) => {
          setReviewBody(event.target.value);
        }}
      ></ReviewInput>
      <RatingDiv>
        <YourRating>Your Rating : </YourRating>
        <div className="rating">
          <input
            onChange={(event) => {
              // event.preventDefault();
              setRating(5);
            }}
            type="radio"
            name="rating"
            id="star5"
          ></input>
          <label htmlFor="star5">5</label>
          <input
            onChange={(event) => {
              // event.preventDefault();
              setRating(4);
            }}
            type="radio"
            name="rating"
            id="star4"
          ></input>
          <label htmlFor="star4">4</label>
          <input
            onChange={(event) => {
              // event.preventDefault();
              setRating(3);
            }}
            type="radio"
            name="rating"
            id="star3"
          ></input>
          <label htmlFor="star3">3</label>
          <input
            onChange={(event) => {
              // event.preventDefault();
              setRating(2);
            }}
            type="radio"
            name="rating"
            id="star2"
          ></input>
          <label htmlFor="star2">2</label>
          <input
            onChange={(event) => {
              // event.preventDefault();
              setRating(1);
            }}
            type="radio"
            name="rating"
            id="star1"
          ></input>
          <label htmlFor="star1">1</label>
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
              setReviewBody("");
              setReviews([...reviews, data]);
            });
        }}
      >
        Submit
      </Button>
    </LeaveReviewDiv>
  );
};

const YourRating = styled.p`
  font-size: 20px;
  margin-right: 10px;
`;

const LeaveReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: center;
  width: 100%;
`;

const ReviewInput = styled.textarea`
  border: 1px #00000036 solid;
  margin-top: 30px;
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
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
  padding: 5px;
  border-radius: 22px;
  box-shadow: 1px 1px 5px grey;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

export default ReviewSection;
