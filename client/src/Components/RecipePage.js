import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { useHistory, useParams, Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { ReviewsContext } from "./ReviewsContext";
import ReviewTile from "./ReviewTile";
import ReviewSection from "./LeaveReview";
import marble from "../assets/resultsbackground.jpg";
import Heart from "./Heart";
import Spinner from "./Spinner";

const RecipePage = () => {
  const [currentRecipe, setCurrentRecipe] = React.useState({});
  const { id } = useParams();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [toggleHeart, setToggleHeart] = React.useState(false);
  const { reviews, setReviews } = useContext(ReviewsContext);
  const [currentRecipeReviews, setCurrentRecipeReviews] = React.useState([]);
  const [wasLiked, setWasLiked] = React.useState(false);
  const [wasDisliked, setWasDisliked] = React.useState(false);
  const [loadingStatus, setLoadingStatus] = React.useState("loading");

  const history = useHistory();

  React.useEffect(() => {
    const matchingRecipe = currentUser.history.find((recipe) => {
      return recipe.recipeId === id;
    });

    if (!matchingRecipe) {
      setWasLiked(false);
      setWasDisliked(false);
    } else if (matchingRecipe.isLiked === true) {
      setWasLiked(true);
      setWasDisliked(false);
    } else if (matchingRecipe.isLiked === false) {
      setWasDisliked(true);
      setWasLiked(false);
    }
  }, [currentUser.history]);

  React.useEffect(() => {
    const currentReviews = reviews.filter((review) => {
      if (review.recipeId === parseInt(id)) {
        return review;
      }
    });

    setCurrentRecipeReviews(currentReviews);
  }, [reviews]);

  React.useEffect(() => {
    setLoadingStatus("loading");
    fetch(`/getrecipe/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentRecipe(data);
        setLoadingStatus("ready");
      });
  }, []);

  React.useEffect(() => {
    if (currentUser.favorites.includes(id)) {
      setToggleHeart(true);
    } else {
      setToggleHeart(false);
    }
  }, [currentUser.favorites]);

  const setLikedDisliked = (isLiked) => {
    fetch("/triedit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser._id,
        recipeId: id,
        isLiked: isLiked,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          history: data,
        });
      });
  };

  return (
    <>
      <NavBar />
      {loadingStatus === "ready" ? (
        <>
          <BackButton
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </BackButton>
          <HomeButton>
            <HomeLink to="/homepage">Homepage</HomeLink>
          </HomeButton>

          <Recipe>
            <ImageHeader></ImageHeader>

            <RoundImage
              style={
                currentRecipe.image
                  ? { backgroundImage: `url(${currentRecipe.image})` }
                  : {}
              }
            ></RoundImage>

            <TextDiv>
              <Title>{currentRecipe.title}</Title>
              <TextWrapper>
                <IngredientsDiv>
                  <Description>Ingredients</Description>
                  {currentRecipe.extendedIngredients
                    ? currentRecipe.extendedIngredients.map((ingredient, i) => {
                        return (
                          <Ingredient key={i}>
                            {ingredient.originalString}
                          </Ingredient>
                        );
                      })
                    : null}
                </IngredientsDiv>
                <Steps>
                  <Description>Insctructions</Description>
                  {currentRecipe.recipeSteps
                    ? currentRecipe.recipeSteps.map((recipeStep, i) => {
                        return (
                          <StepDiv key={i}>{`${i + 1}. ${
                            recipeStep.step
                          }`}</StepDiv>
                        );
                      })
                    : null}
                </Steps>
              </TextWrapper>
            </TextDiv>

            <FavoriteDiv>
              <HeartBox>
                <Heart id={id} />
              </HeartBox>

              {!toggleHeart ? (
                <FavText>Add to Favorites</FavText>
              ) : (
                <FavText>Added to Favorites</FavText>
              )}
            </FavoriteDiv>

            <TriedDiv>
              Tried it already? let us know if you<br></br>
              <LovedIt
                style={
                  wasLiked
                    ? {
                        backgroundColor: "#f2c2ca",
                        cursor: "default",
                        color: "black",
                      }
                    : {}
                }
                disabled={wasLiked}
                onClick={() => {
                  setLikedDisliked(true);
                  setWasLiked(true);
                  setWasDisliked(false);
                }}
              >
                loved it
              </LovedIt>{" "}
              or
              <HatedIt
                style={
                  wasDisliked
                    ? {
                        backgroundColor: "#f2c2ca",
                        cursor: "default",
                        color: "black",
                      }
                    : {}
                }
                disabled={wasDisliked}
                onClick={() => {
                  setLikedDisliked(false);
                  setWasDisliked(true);
                  setWasLiked(false);
                }}
              >
                didn't
              </HatedIt>
              .
            </TriedDiv>

            <RatingWrapper>
              <RatingsTitle>
                See what other users thought of this recipe
              </RatingsTitle>
              <Rating>
                {currentRecipeReviews.length > 0 ? (
                  currentRecipeReviews.map((review, i) => {
                    return <ReviewTile key={i} review={review} />;
                  })
                ) : (
                  <NoReviews>No reviews yet.</NoReviews>
                )}
              </Rating>

              <ReviewSection recipeId={parseInt(id)} />
            </RatingWrapper>
          </Recipe>
        </>
      ) : (
        <SpinnerContainer>
          {" "}
          <Spinner />
        </SpinnerContainer>
      )}
    </>
  );
};

const SpinnerContainer = styled.div`
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const NoReviews = styled.div``;

const HeartBox = styled.div`
  padding-top: 5px;
`;

const Recipe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  top: 40%;
  left: 2%;
  text-decoration: none;
  background-color: white;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const HomeButton = styled.button`
  position: absolute;
  top: 45%;
  left: 2%;
  text-decoration: none;
  background-color: white;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const ImageHeader = styled.div`
  background-image: url(${marble});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 25vh;
  width: 100%;
`;

const RoundImage = styled.div`
  border-radius: 50%;
  height: 360px;
  width: 360px;
  border: 10px white solid;
  z-index: 9;
  position: relative;
  margin-top: -10%;
  background-position: bottom;
  @media (max-width: 768px) {
    height: 200px;
    width: 200px;
    margin-top: -30%;
  }
`;

const ResultsLink = styled(Link)`
  text-decoration: none;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
`;

const Description = styled.h3`
  font-size: 20px;
  border-bottom: grey solid 1px;
  margin-bottom: 15px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  border: grey solid 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  @media (max-width: 768px) {
    display: block;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 10px;
  text-align: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const IngredientsDiv = styled.div`
  line-height: 2;
  max-width: 500px;
`;

const Ingredient = styled.div``;

const Steps = styled.div`
  justify-content: center;
  line-height: 2;
  width: 50%;
  justify-content: center;
`;

const StepDiv = styled.div`
  margin-bottom: 15px;
`;

const FavoriteDiv = styled.div`
  margin-top: 15px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 15%;
  position: absolute;
  top: 50%;
  left: 80%;
  @media (max-width: 768px) {
    position: absolute;
    top: 40%;
  }
`;

const FavText = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;

const TriedDiv = styled.div`
  width: 25%;
  text-align: right;
  line-height: 2;
  z-index: 9;
  position: absolute;
  top: 40%;
  left: 70%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LovedIt = styled.button`
  border-radius: 20px;
  padding-left: 7px;
  padding-right: 7px;
  box-shadow: 1px 1px 5px grey;
  cursor: pointer;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const HatedIt = styled.button`
  border-radius: 24px;
  padding-left: 7px;
  padding-right: 7px;
  margin-left: 5px;
  box-shadow: 1px 1px 5px grey;
  cursor: pointer;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 50%;
  @media (max-width: 768px) {
    width: auto;
    margin: auto;
  }
`;

const RatingsTitle = styled.div`
  font-size: 30px;
  margin-bottom: 15px;
`;

const Rating = styled.div`
  width: 100%;
`;

export default RecipePage;
