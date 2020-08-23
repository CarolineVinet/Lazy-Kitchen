import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import RecipeTile from "./RecipeSmall";
import { BasicResultsContext } from "./BasicResultsContext";
import { Link } from "react-router-dom";

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
      <NavBar />
      <Button>
        <HomeLink to="/homepage">Try a different search</HomeLink>
      </Button>
      <Button>
        <ProfileLink to="/profile"> My Profile</ProfileLink>
      </Button>
      <Recipes>
        Here is a list of search results
        {hasResults ? (
          recipeResults.map((recipe) => {
            return <RecipeTile key={recipe.id} recipe={recipe} />;
          })
        ) : (
          <NoResults>
            We're sorry, we couldn't find a recipe based on the search criteria
            you entered. Maybe try something different..
          </NoResults>
        )}
      </Recipes>
    </>
  );
};

const Recipes = styled.div``;

const Button = styled.button``;

const HomeLink = styled(Link)``;
const ProfileLink = styled(Link)``;
const NoResults = styled.div`
  color: red;
`;

export default Results;
