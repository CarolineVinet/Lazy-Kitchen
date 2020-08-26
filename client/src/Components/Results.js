import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import RecipeTile from "./RecipeSmall";
import { BasicResultsContext } from "./BasicResultsContext";
import { Link } from "react-router-dom";
import resultsBackground from "../assets/resultsbackground.jpg";

const Results = () => {
  const { recipeResults } = useContext(BasicResultsContext);
  const [hasResults, setHasResults] = React.useState(false);

  React.useEffect(() => {
    console.log(recipeResults);
    if (recipeResults.length > 0) {
      setHasResults(true);
    } else {
      setHasResults(false);
    }
  }, [recipeResults]);

  return (
    <>
      <Body>
        <NavBar />
        {/* <Button>
          <ProfileLink to="/profile"> My Profile</ProfileLink>
        </Button> */}

        <ResultsText>Your search results</ResultsText>

        <BackButton>
          <HomeLink to="/homepage">Try a different search</HomeLink>
        </BackButton>
        <Wrapper>
          <Recipes>
            {hasResults ? (
              recipeResults.map((recipe) => {
                return <RecipeTile key={recipe.id} recipe={recipe} />;
              })
            ) : (
              <NoResults>
                We're sorry, we couldn't find a recipe based on the search
                criteria you entered.<br></br> Maybe try something different..
              </NoResults>
            )}
          </Recipes>
        </Wrapper>
      </Body>
    </>
  );
};

const Body = styled.div`
  background-image: url(${resultsBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ResultsText = styled.p`
  font-size: 55px;
  padding-left: 80px;
  padding-top: 5px;
  width: 40%;
  position: relative;
  left: 30%;
`;

const Recipes = styled.div`
  /* border: orange dashed 3px; */
  position: relative;
  left: 15%;
  box-shadow: 1px 1px 10px grey;
  padding: 20px;
  background-color: #ffffff9c;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
  width: 70%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
  width: 75%;
  position: relative;
  left: 10%;
  top: 0%;
  line-height: 2;
  padding: 20px;
  box-shadow: 2px 2px 10px grey;
`;

const BackButton = styled.button`
  position: relative;
  left: 5%;
  margin-bottom: 30px;
  padding: 7px;
  border-radius: 20px;
  padding-left: 7px;
  padding-right: 7px;
`;

const HomeLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
`;
const NoResults = styled.div`
  color: red;
`;

export default Results;
