import React from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <NavBar></NavBar>
      <Button>
        <ProfileLink to="/profile"> My Profile</ProfileLink>
      </Button>
      <Home>
        Here you'll find a recipe
        <GetRecipe
          onClick={() => {
            fetch("/getbasicrecipe", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                console.log(data.results);
              });
          }}
        >
          Get me a recipe NOW!
        </GetRecipe>
      </Home>
    </>
  );
};

const Home = styled.div``;

const Button = styled.button``;

const ProfileLink = styled(Link)``;

const GetRecipe = styled.button``;

export default Homepage;
