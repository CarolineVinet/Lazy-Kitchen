import React from "react";
import styled from "styled-components";
import NavBar from "./Navbar";

const Homepage = () => {
  return (
    <>
      <NavBar />
      <Home>Here you'll find a recipe</Home>;
    </>
  );
};

const Home = styled.div``;

export default Homepage;
