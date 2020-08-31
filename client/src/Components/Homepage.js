import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { Link, useHistory } from "react-router-dom";
import { BasicResultsContext } from "./BasicResultsContext";
import { CurrentUserContext } from "./CurrentUserContext";
import LazyFilter from "./LazyFilter";
import { LazyContext } from "./LazyContext";

import searchbackground from "../assets/searchbackground.jpg";

const Homepage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { setRecipeResults } = useContext(BasicResultsContext);
  const [inputText, setInputText] = React.useState("");
  const [ingredientInput, setIngredientInput] = React.useState("");
  const { lazyFilter } = useContext(LazyContext);
  const history = useHistory();

  return (
    <>
      <Body>
        <NavBar></NavBar>

        <BigTitle>Recipe Finder</BigTitle>
        <Text>
          <Title>Two ways to get inspired</Title>
          <SearchesDiv>
            <SearchOne>
              <HThree>Quick Search</HThree>
              <Instructions>
                Have a specific dish in mind?
                <br></br>
                Enter at least one keyword to launch your search.
              </Instructions>
              <Input
                placeholder=" i.e.: lasagna"
                onChange={(event) => {
                  setInputText(event.target.value);
                }}
                type="text"
              ></Input>
              <br></br>
              <GetRecipe
                onClick={() => {
                  fetch(
                    `/getbasicrecipe?search=${inputText}&diet=${currentUser.diet}&allergies=${currentUser.allergies}&avoid=${currentUser.avoid}&lazy=${lazyFilter}`,
                    {
                      method: "GET",
                      headers: { "Content-Type": "application/json" },
                    }
                  )
                    .then((res) => {
                      return res.json();
                    })
                    .then((data) => {
                      setRecipeResults(data);
                      history.push("/results");
                    });
                }}
              >
                Search!
              </GetRecipe>
            </SearchOne>

            <SearchTwo>
              <HThree>Search by ingredients</HThree>
              <Instructions>
                Want to use up what you have? <br></br>Enter the ingredients you
                have on hand <br></br>(separated by comas) and see what you can
                create!
              </Instructions>
              <Wrapper>
                <IngredientInput
                  rows="4"
                  cols="30"
                  placeholder=" i.e.:  milk, eggs, flour, etc"
                  onChange={(event) => {
                    setIngredientInput(event.target.value);
                  }}
                  type="text"
                ></IngredientInput>
                <br></br>
                <GetRecipe
                  onClick={() => {
                    fetch(
                      `/getrecipebyingredients?search=${ingredientInput}&diet=${currentUser.diet}&allergies=${currentUser.allergies}&avoid=${currentUser.avoid}&lazy=${lazyFilter}`,
                      {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                      }
                    )
                      .then((res) => {
                        return res.json();
                      })
                      .then((data) => {
                        setRecipeResults(data);
                        history.push("/results");
                      });
                  }}
                >
                  Search!
                </GetRecipe>
              </Wrapper>
            </SearchTwo>
          </SearchesDiv>
          <FilterDiv>
            <HThree>How are you feeling?</HThree>
            <LazyFilter />
            <LazyInstructions>
              We'll sort your search results by preparation time based on your
              current energy level.
            </LazyInstructions>
          </FilterDiv>
        </Text>
      </Body>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Body = styled.div`
  background-image: url(${searchbackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  align-items: center;
  @media (max-width: 768px) {
    height: 100%;
  }
`;

const Text = styled.div`
  background-color: #ffffff9c;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 60%;
  position: relative;
  left: 20%;
  top: 5%;
  box-shadow: 1px 1px 8px grey;
  @media (max-width: 768px) {
    width: 75%;
    position: relative;
    left: 12.5%;
    margin-bottom: 20px;
  }
`;

const BigTitle = styled.h1`
  font-size: 55px;
  margin-bottom: 15px;
  background: transparent;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 45px;
  }
`;

const SearchesDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 15px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SearchOne = styled.div`
  background-color: white;
  text-align: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 1px 1px 10px #80808080;
  @media (max-width: 768px) {
    margin-bottom: inherit;
  }
`;
const SearchTwo = styled.div`
  background-color: white;
  text-align: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 1px 1px 10px #80808080;
  @media (max-width: 768px) {
    margin-bottom: inherit;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const HThree = styled.h3`
  font-size: 24px;
  padding-bottom: 10px;
  text-align: center;
`;

const Instructions = styled.p`
  margin: 15px;
`;

const Input = styled.input`
  border: 1px solid #00000036;
  margin: 5px;
  font-style: italic;
  padding-left: 3px;
  border-radius: 5px;
  height: 30px;
  width: 120px;
  font-size: 15px;
`;

const IngredientInput = styled.textarea`
  border: #00000036 solid 1px;
  margin: 5px;
  padding-left: 3px;
  resize: none;
  border-radius: 5px;
  font-size: 15px;
  font-style: italic;
  &:focus {
    outline: none;
  }
`;

const FilterDiv = styled.div`
  justify-content: center;
  align-items: center;
`;

const LazyInstructions = styled.p`
  text-align: center;
  line-height: 2;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
`;

const GetRecipe = styled.button`
  text-decoration: none;
  padding: 10px;
  border-radius: 22px;
  box-shadow: 1px 1px 5px grey;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const Results = styled.div``;

export default Homepage;
