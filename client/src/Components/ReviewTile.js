import React from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ReviewTile = ({ review }) => {
  const [stars, setStars] = React.useState([]);

  React.useEffect(() => {
    const starArr = [];

    for (let i = 1; i <= parseInt(review.rating); i++) {
      starArr.push("entry");
    }

    setStars(starArr);
  }, [review.rating]);

  return (
    <LinkToRecipe to={`/results/${review.recipeId}`}>
      <Review>
        <Top>
          <ReviewAuthor>Review left by {review.author}</ReviewAuthor>
          <ReviewRating>
            {stars.map((star) => {
              return <AiOutlineStar />;
            })}
          </ReviewRating>
        </Top>
        <Bottom>
          <ReviewDate>{review.date}</ReviewDate>
          <ReviewBody>{review.body}</ReviewBody>
        </Bottom>
      </Review>
    </LinkToRecipe>
  );
};

const LinkToRecipe = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  box-shadow: 1px 1px 5px grey;
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

const ReviewRating = styled.div`
  color: black;
`;

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
