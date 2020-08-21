import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RecipeTile = ({ recipe }) => {
  const imageSrc = recipe.image.includes("https://spoonacular.com")
    ? recipe.image
    : `https://spoonacular.com/recipeImages/${recipe.image}`;

  return (
    <Recipe>
      <RecipeLink to={`/results/${recipe.id}`}>
        <RecipeFormat>{recipe.title}</RecipeFormat>
        <RecipeImage src={imageSrc}></RecipeImage>
      </RecipeLink>
    </Recipe>
  );
};

const Recipe = styled.div``;
const RecipeFormat = styled.div``;
const RecipeImage = styled.img``;

const RecipeLink = styled(Link)``;

export default RecipeTile;
