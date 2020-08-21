import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const HistoryTile = ({ recipe }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    console.log(recipe.id);
    console.log(currentUser.history);
    const matchingRecipe = currentUser.history.find(
      (item) => item.recipeId === recipe.id.toString()
    );

    setIsLiked(matchingRecipe.isLiked);
  }, []);

  const imageSrc = recipe.image.includes("https://spoonacular.com")
    ? recipe.image
    : `https://spoonacular.com/recipeImages/${recipe.image}`;

  return (
    <History>
      <RecipeDiv>
        <p>
          You tried this recipe {isLiked ? " and liked" : "but didn't like"} it.
        </p>
        <RecipeLink to={`/results/${recipe.id}`}>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeImage src={imageSrc}></RecipeImage>
        </RecipeLink>
      </RecipeDiv>
    </History>
  );
};

const History = styled.div``;
const RecipeDiv = styled.div``;
const RecipeLink = styled(Link)``;
const RecipeTitle = styled.div``;
const RecipeImage = styled.img``;

export default HistoryTile;
