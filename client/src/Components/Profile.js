import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";
import RecipeTile from "./RecipeSmall";
import HistoryTile from "./HistoryTile";
import DietModal from "./DietaryRestrictions";
import profileHeader from "../assets/profileheader.jpg";
import userpic from "../assets/userprofilepic.png";

const Profile = () => {
  const {
    currentUser,
    firstTimeModalVisible,
    setFirstTimeModalVisible,
  } = useContext(CurrentUserContext);
  const [userFavorites, setUserFavorites] = React.useState([]);
  const [userHistory, setUserHistory] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(firstTimeModalVisible);

  React.useEffect(() => {
    if (currentUser.favorites.length > 0) {
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
    }
  }, [currentUser.favorites]);

  //////getting history stuff////

  React.useEffect(() => {
    if (currentUser.history.length > 0) {
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
    }
  }, [currentUser.history]);

  return (
    <>
      <NavBar></NavBar>
      <Button>
        <HomeLink to="/homepage">Homepage</HomeLink>
      </Button>

      <Main>
        <HeaderImage></HeaderImage>
        <UserPictureDiv src={userpic}></UserPictureDiv>

        <ProfilePage>
          {currentUser.firstName} {currentUser.lastName}
          {modalVisible ? (
            <div>
              {" "}
              <button
                onClick={() => {
                  setModalVisible(false);
                  setFirstTimeModalVisible(false);
                }}
              >
                X
              </button>{" "}
              <DietModal />{" "}
            </div>
          ) : null}
          <TabsBar>
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
            <Settings
              onClick={(event) => {
                event.preventDefault();
                setModalVisible(true);
              }}
            >
              Edit your dietary preferences
            </Settings>
          </TabsBar>
        </ProfilePage>
      </Main>
    </>
  );
};

const Main = styled.div`
  border: red solid 2px;
  display: flex;
  flex-direction: column;
`;

const HeaderImage = styled.div`
  background-image: url(${profileHeader});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 25vh;
  width: 100%;
  border: orange 2px solid;
`;

const UserPictureDiv = styled.img`
  border-radius: 50%;
  z-index: 9;
  position: absolute;
  left: 10%;
  top: 20%;
  max-width: 220px;
  max-height: 220px;
`;

const ProfilePage = styled.div``;

const Button = styled.button`
  z-index: 8;
  position: absolute;
  top: 0px;
  left: 1300px;
  padding: 20px;
  background-color: white;
  &:hover {
    box-shadow: 1px 1px 10px #80808085;
  }
`;

const TabsBar = styled.div`
  border: 3px solid fuchsia;
`;

const Settings = styled.button``;

const HomeLink = styled(Link)``;

const Favorites = styled.div``;

const FavoriteList = styled.div``;

const RecipeHistory = styled.div``;

export default Profile;
