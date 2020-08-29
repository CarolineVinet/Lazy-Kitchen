import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const HistoryTile = ({ recipe }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
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
      <RecipeLink to={`/results/${recipe.id}`}>
        <InnerRecipe style={{ backgroundImage: `url(${imageSrc})` }}>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <Text>
            You tried this recipe {isLiked ? " and liked" : "but didn't like"}{" "}
            it.
          </Text>
        </InnerRecipe>
      </RecipeLink>
    </History>
  );
};

const History = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
const RecipeLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const RecipeTitle = styled.div`
  text-decoration: none;
  text-shadow: 1px 1px 4px black;
  font-size: 22px;
  padding-top: 40px;
  font-weight: bold;
  color: white;
  z-index: 2;
  background: transparent;
  &:hover {
    transition: 0.25s ease-in;
    filter: brightness(5);
  }
`;

const Text = styled.p`
  color: black;
  box-shadow: 1px 1px 5px grey;

  margin: 10px;
  text-align: center;
  font-size: 18px;
  background-color: #e6e0e0d6;
  padding: 7px;
  width: max-content;
  border-radius: 20px;
`;

export default HistoryTile;
