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
        <RecipeLink to={`/results/${recipe.id}`}>
          <RecipeTitle>{recipe.title}</RecipeTitle>

          <Body>
            <RecipeImage
              style={{ backgroundImage: `url(${imageSrc})` }}
            ></RecipeImage>
            <Text>
              You tried this recipe {isLiked ? " and liked" : "but didn't like"}{" "}
              it.
            </Text>
          </Body>
        </RecipeLink>
      </RecipeDiv>
    </History>
  );
};

const History = styled.div`
  border: pink 2px solid;
`;

const RecipeDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const RecipeLink = styled(Link)``;

const RecipeTitle = styled.div``;

const Body = styled.div`
  display: flex;
  flex-direction: row;
`;
const RecipeImage = styled.div`
  border-radius: 50%;
  height: 200px;
  width: 200px;
`;

const Text = styled.p``;

export default HistoryTile;
