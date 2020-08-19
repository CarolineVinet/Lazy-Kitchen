import React from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import RecipeIcon from "./RecipeSmall";

const Results = () => {
  return (
    <>
      <NavBar />
      <Recipes>
        Here is a list of search results
        <RecipeIcon />
      </Recipes>
    </>
  );
};

const Recipes = styled.div``;

export default Results;
