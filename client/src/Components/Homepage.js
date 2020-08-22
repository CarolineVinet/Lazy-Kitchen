import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { Link, useHistory } from "react-router-dom";
import { BasicResultsContext } from "./BasicResultsContext";
import { CurrentUserContext } from "./CurrentUserContext";

const Homepage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { setRecipeResults } = useContext(BasicResultsContext);
  const [inputText, setInputText] = React.useState("");
  const [ingredientInput, setIngredientInput] = React.useState("");
  const history = useHistory();

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
            fetch(
              `/getbasicrecipe?search=${inputText}&diet=${currentUser.diet}&allergies=${currentUser.allergies}&avoid=${currentUser.avoid}`,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }
            )
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                setRecipeResults(data.results);
                history.push("/results");
              });
          }}
        >
          Get me a recipe NOW!
        </GetRecipe>
        <input
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          type="text"
        ></input>
        {/* search by ingredient function below  */}
        <div>
          <input
            placeholder="enter your ingredients here"
            onChange={(event) => {
              setIngredientInput(event.target.value);
            }}
            type="text"
          ></input>
          <button
            onClick={() => {
              fetch(`/getrecipebyingredients?search=${ingredientInput}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  setRecipeResults(data);
                  history.push("/results");
                });
            }}
          >
            Show me what I can make NOW!
          </button>
        </div>
      </Home>
    </>
  );
};

const Home = styled.div``;

const Button = styled.button``;

const ProfileLink = styled(Link)``;

const GetRecipe = styled.button``;

const Results = styled.div``;

export default Homepage;
