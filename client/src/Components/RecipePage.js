import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { useParams, Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CurrentUserContext } from "./CurrentUserContext";

const RecipePage = () => {
  const [currentRecipe, setCurrentRecipe] = React.useState({});
  const { id } = useParams();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [toggleHeart, setToggleHeart] = React.useState(false);

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
      <Button>
        <ResultsLink to="/results">Back</ResultsLink>
      </Button>
      <Button>
        <HomeLink to="/homepage">Homepage</HomeLink>
      </Button>
      <Button>
        <ProfileLink to="/profile"> My Profile</ProfileLink>
      </Button>
      <Recipe>
        The is the recipe page
        <div>{currentRecipe.title}</div>
        <img src={currentRecipe.image}></img>
        <div>{currentRecipe.instructions}</div>
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
            <AiFillHeart />
          </UnfavoriteIt>
        )}
        <p>
          Tried it already? let us know if you{" "}
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
        </p>
      </Recipe>
    </>
  );
};

const Recipe = styled.div``;

const Button = styled.button``;

const HomeLink = styled(Link)``;

const ProfileLink = styled(Link)``;

const ResultsLink = styled(Link)``;

const FavoriteIt = styled.button``;

const UnfavoriteIt = styled.button``;

const LovedIt = styled.button``;

const HatedIt = styled.button``;

export default RecipePage;
