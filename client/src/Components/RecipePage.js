import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { useParams, Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CurrentUserContext } from "./CurrentUserContext";
import { ReviewsContext } from "./ReviewsContext";
import ReviewTile from "./ReviewTile";
import ReviewSection from "./LeaveReview";
import marble from "../assets/resultsbackground.jpg";
// import Heart from "./Heart";

const RecipePage = () => {
  const [currentRecipe, setCurrentRecipe] = React.useState({});
  const { id } = useParams();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [toggleHeart, setToggleHeart] = React.useState(false);
  const { reviews, setReviews } = useContext(ReviewsContext);

  React.useEffect(() => {
    fetch(`/getrecipe/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentRecipe(data);
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
      <BackButton>
        <ResultsLink to="/results">Back</ResultsLink>
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
          {/* <Heart id={id} />; */}
          {!toggleHeart ? (
            <FavText>Add to Favorites</FavText>
          ) : (
            <FavText>Added to Favorites</FavText>
          )}
          {!toggleHeart ? (
            <FavoriteIt
              onClick={() => {
                fetch("/addfavorite", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    recipeId: id,
                    userId: currentUser._id,
                  }),
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    console.log("favourites response", data);
                    setCurrentUser({
                      ...currentUser,
                      favorites: data,
                    });
                    setToggleHeart(true);
                    //
                    // if toggledheart is true, display icon vs other
                  });
              }}
            >
              <AiOutlineHeart />
            </FavoriteIt>
          ) : (
            <UnfavoriteIt
              onClick={() => {
                fetch("/removefavorite", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    recipeId: id,
                    userId: currentUser._id,
                  }),
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    setCurrentUser({
                      ...currentUser,
                      favorites: data,
                    });
                    setToggleHeart(false);
                  });
              }}
            >
              <AiFillHeart color="red" />
            </UnfavoriteIt>
          )}
        </FavoriteDiv>

        <TriedDiv>
          Tried it already? let us know if you<br></br>
          <LovedIt
            onClick={() => {
              setLikedDisliked(true);
            }}
          >
            loved it
          </LovedIt>{" "}
          or
          <HatedIt
            onClick={() => {
              setLikedDisliked(false);
            }}
          >
            not
          </HatedIt>
          .
        </TriedDiv>

        <RatingWrapper>
          <RatingsTitle>
            See what other users thought of this recipe
          </RatingsTitle>
          <Rating>
            {reviews.map((review, i) => {
              if (review.recipeId === parseInt(id)) {
                return <ReviewTile key={i} review={review} />;
              }
            })}
          </Rating>

          <ReviewSection recipeId={parseInt(id)} />
        </RatingWrapper>
      </Recipe>
    </>
  );
};

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
`;

const HomeButton = styled.button`
  position: absolute;
  top: 45%;
  left: 2%;
  text-decoration: none;
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
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 10px;
  text-align: center;
  justify-content: center;
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
  display: flex;
  flex-direction: row-reverse;
  width: 15%;
  position: absolute;
  top: 50%;
  left: 80%;
`;

const FavText = styled.p``;

const FavoriteIt = styled.button`
  background-color: white;
  margin-right: 5px;
  padding-top: 3px;
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

const UnfavoriteIt = styled.button`
  background-color: white;
  margin-right: 5px;
  padding-top: 3px;
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

const TriedDiv = styled.div`
  width: 25%;
  text-align: right;
  line-height: 2;
  z-index: 9;
  position: absolute;
  top: 40%;
  left: 70%;
`;

const LovedIt = styled.button`
  border-radius: 20px;
  padding-left: 7px;
  padding-right: 7px;
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
`;

const RatingsTitle = styled.div`
  font-size: 30px;
`;

const Rating = styled.div`
  width: 100%;
`;

export default RecipePage;
