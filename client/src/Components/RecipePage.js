import React from "react";
import styled from "styled-components";
import NavBar from "./Navbar";

const RecipePage = () => {
  return (
    <>
      <NavBar />
      <Recipe>The is the recipe page</Recipe>;
    </>
  );
};

const Recipe = styled.div``;

export default RecipePage;
