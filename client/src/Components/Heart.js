import React, { useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";

import { CurrentUserContext } from "./CurrentUserContext";

const Heart = ({ id }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [toggleHeart, setToggleHeart] = React.useState(false);

  const recipeId = id.toString();

  React.useEffect(() => {
    if (currentUser.favorites.includes(recipeId)) {
      setToggleHeart(true);
    } else {
      setToggleHeart(false);
    }
  }, [currentUser.favorites]);

  return (
    <HeartDiv>
      {!toggleHeart ? (
        <FavoriteIt
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            fetch("/addfavorite", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                recipeId: recipeId,
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
              });
          }}
        >
          <AiOutlineHeart style={{ height: "20px", width: "20px" }} />
        </FavoriteIt>
      ) : (
        <UnfavoriteIt
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            fetch("/removefavorite", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                recipeId: recipeId,
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
              });
          }}
        >
          <AiFillHeart color="red" style={{ height: "20px", width: "20px" }} />
        </UnfavoriteIt>
      )}
    </HeartDiv>
  );
};

const HeartDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const FavoriteIt = styled.button`
  background-color: #ffffffc9;
  height: 32px;
  /* padding-right: 7px;
  padding-left: 7px; */
  padding: 7px;
  border-radius: 22px;
  cursor: pointer;
  &:hover {
    background-color: #ddbaf8c9;
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
  background-color: #ffffffc9;
  height: 32px;
  /* padding-right: 7px;
  padding-left: 7px; */
  padding: 7px;
  border-radius: 22px;
  cursor: pointer;
  &:hover {
    background-color: #ddbaf8c9;
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

export default Heart;
