import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";
import RecipeTile from "./RecipeSmall";
import HistoryTile from "./HistoryTile";
import DietModal from "./DietaryRestrictions";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [userFavorites, setUserFavorites] = React.useState([]);
  const [userHistory, setUserHistory] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetch(`/getallfavorites?favorites=${currentUser.favorites}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("recipe array data :: ", data);
        setUserFavorites(data);
      });
  }, [currentUser.favorites]);

  //////getting history stuff////

  React.useEffect(() => {
    const recipedIds = currentUser.history.map((item) => {
      return item.recipeId;
    });

    fetch(`/getuserhistory?history=${recipedIds}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserHistory(data);
      });
  }, [currentUser.history]);

  return (
    <>
      <NavBar></NavBar>
      <Button>
        <HomeLink to="/homepage">Homepage</HomeLink>
      </Button>

      <Settings
        onClick={(event) => {
          event.preventDefault();
          setModalVisible(true);
        }}
      >
        Edit your preferences
      </Settings>

      <ProfilePage>
        {currentUser.firstName}
        {""}
        {currentUser.lastName}

        {modalVisible ? (
          <div>
            {" "}
            <button
              onClick={() => {
                setModalVisible(false);
              }}
            >
              X
            </button>{" "}
            <DietModal />{" "}
          </div>
        ) : null}

        <Favorites>
          <p>Your Favorite recipes</p>
          <FavoriteList>
            {userFavorites.map((favorite) => {
              return <RecipeTile recipe={favorite} />;
            })}
          </FavoriteList>
        </Favorites>
        <RecipeHistory>
          <div>Your history</div>
          {userHistory
            ? userHistory.map((triedrecipe) => {
                return <HistoryTile recipe={triedrecipe} />;
              })
            : null}
        </RecipeHistory>
      </ProfilePage>
    </>
  );
};

const ProfilePage = styled.div``;

const Button = styled.button``;

const Settings = styled.button``;

const HomeLink = styled(Link)``;

const Favorites = styled.div``;

const FavoriteList = styled.div``;

const RecipeHistory = styled.div``;

export default Profile;
