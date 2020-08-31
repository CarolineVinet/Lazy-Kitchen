import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Heart from "./Heart";

const RecipeTile = ({ recipe }) => {
  const imageSrc =
    recipe.image && recipe.image.includes("https://spoonacular.com")
      ? recipe.image
      : `https://spoonacular.com/recipeImages/${recipe.image}`;

  return (
    <Recipe>
      <RecipeLink to={`/results/${recipe.id}`}>
        <FaveDiv>
          <Heart id={recipe.id} />
        </FaveDiv>
        <InnerRecipe style={{ backgroundImage: `url(${imageSrc})` }}>
          <RecipeFormat>{recipe.title}</RecipeFormat>
          <RecipeTime>Prep Time : {recipe.readyInMinutes}mins.</RecipeTime>
        </InnerRecipe>
      </RecipeLink>
    </Recipe>
  );
};

const FaveDiv = styled.div`
  z-index: 2;
  width: 60px;
  position: absolute;
  left: 90%;
  @media (max-width: 768px) {
    position: absolute;
    left: unset;
  }
`;

const Recipe = styled.div`
  box-shadow: 1px 1px 10px grey;
  border-radius: 8px;
  width: 80%;
  height: 200px;
  margin-bottom: 20px;
  position: relative;
  left: 10%;
  justify-content: center;
`;

const InnerRecipe = styled.div`
  box-shadow: 1px 1px 10px grey;
  border-radius: 10px;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);

    transition: 0.3s;
  }
`;

const RecipeFormat = styled.div`
  text-decoration: none;
  text-shadow: 1px 1px 4px black;
  font-size: 24px;
  padding-top: 50px;
  font-weight: bold;
  color: white;
  z-index: 2;
  background: transparent;
  &:hover {
    transition: 0.25s ease-in;
    filter: brightness(5);
  }
`;

const RecipeTime = styled.div`
  text-decoration: none;
  text-shadow: 1px 1px 4px black;
  font-weight: bold;
  color: white;
  font-size: 22px;
  z-index: 2;
  background: transparent;
`;

const RecipeImage = styled.img`
  width: 100%;
`;

const RecipeLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default RecipeTile;
