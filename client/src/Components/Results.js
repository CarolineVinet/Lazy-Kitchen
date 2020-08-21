import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import RecipeTile from "./RecipeSmall";
import { BasicResultsContext } from "./BasicResultsContext";
import { Link } from "react-router-dom";

const Results = () => {
  const { recipeResults } = useContext(BasicResultsContext);

  return (
    <>
      <NavBar />
      <Button>
        <HomeLink to="/homepage">Try a different search</HomeLink>
      </Button>
      <Button>
        <ProfileLink to="/profile"> My Profile</ProfileLink>
      </Button>
      <Recipes>
        Here is a list of search results
        {recipeResults.map((recipe) => {
          return <RecipeTile key={recipe.id} recipe={recipe} />;
        })}
      </Recipes>
    </>
  );
};

const Recipes = styled.div``;

const Button = styled.button``;

const HomeLink = styled(Link)``;
const ProfileLink = styled(Link)``;

export default Results;
