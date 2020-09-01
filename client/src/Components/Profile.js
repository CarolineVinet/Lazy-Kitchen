import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import NavBar from "./Navbar";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";
import RecipeTile from "./RecipeSmall";
import HistoryTile from "./HistoryTile";
import DietModal from "./DietaryRestrictions";
import profileHeader from "../assets/profileheader.jpg";
import userpic from "../assets/userprofilepic.png";
import { ReviewsContext } from "./ReviewsContext";
import ReviewTile from "./ReviewTile";
import marble from "../assets/resultsbackground.jpg";
import DietPopUp from "./DietPopUp";
import avatar from "../assets/avatar.png";
import Spinner from "./Spinner";

const Profile = () => {
  const {
    currentUser,
    firstTimeModalVisible,
    setFirstTimeModalVisible,
    firstTimePopUpVisible,
  } = useContext(CurrentUserContext);
  const { reviews } = useContext(ReviewsContext);
  const [userFavorites, setUserFavorites] = React.useState([]);
  const [userHistory, setUserHistory] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(firstTimeModalVisible);
  const [popUpVisible, setPopUpVisible] = React.useState(firstTimePopUpVisible);
  const [favoritesVisible, setFavoritesVisible] = React.useState(false);
  const [historyVisible, setHistoryVisible] = React.useState(false);
  const [reviewsVisible, setReviewsVisible] = React.useState(false);
  const [savedVisible, setSavedVisible] = React.useState(false);
  const [profileStatus, setProfileStatus] = React.useState("loading");

  React.useEffect(() => {
    setTimeout(() => {
      setProfileStatus("ready");
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (currentUser.favorites && currentUser.favorites.length > 0) {
      fetch(`/getallfavorites?favorites=${currentUser.favorites}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserFavorites(data);
        });
    }
  }, [currentUser.favorites]);

  //////getting history stuff////

  React.useEffect(() => {
    if (currentUser.history && currentUser.history.length > 0) {
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
      {profileStatus === "ready" ? (
        <>
          {popUpVisible ? (
            <DietPopUp setPopUpVisible={setPopUpVisible}></DietPopUp>
          ) : null}
          <Body>
            <NavBar isOnProfile={true} />

            <Main>
              <TopDiv>
                <HeaderImage></HeaderImage>
                <UserPictureDiv></UserPictureDiv>
                <NameDiv>
                  {currentUser.firstName} {currentUser.lastName}
                </NameDiv>
              </TopDiv>
              <ProfilePage>
                <TabsBar>
                  <Favorites
                    onClick={() => {
                      setFavoritesVisible(!favoritesVisible);
                      setHistoryVisible(false);
                      setReviewsVisible(false);
                      setModalVisible(false);
                    }}
                  >
                    <Full>Your favorite recipes</Full>
                    <Short>Favorites</Short>
                  </Favorites>

                  <RecipeHistory
                    onClick={() => {
                      setHistoryVisible(!historyVisible);
                      setFavoritesVisible(false);
                      setReviewsVisible(false);
                      setModalVisible(false);
                    }}
                  >
                    <Full>Your recipe history</Full>
                    <Short>History</Short>
                  </RecipeHistory>

                  <Settings
                    onClick={(event) => {
                      event.preventDefault();
                      setModalVisible(true);
                      setHistoryVisible(false);
                      setFavoritesVisible(false);
                      setReviewsVisible(false);
                    }}
                  >
                    <Full>Edit your dietary preferences</Full>
                    <Short>Preferences</Short>
                  </Settings>

                  <Reviews
                    onClick={() => {
                      setReviewsVisible(!reviewsVisible);
                      setHistoryVisible(false);
                      setModalVisible(false);
                      setFavoritesVisible(false);
                    }}
                  >
                    <Full>Your reviews</Full>
                    <Short>Reviews</Short>
                  </Reviews>
                </TabsBar>
                <Content>
                  {favoritesVisible === true ? (
                    <FavoriteList>
                      {userFavorites.map((favorite) => {
                        if (
                          currentUser.favorites.includes(favorite.id.toString())
                        ) {
                          return <RecipeTile recipe={favorite} />;
                        }
                      })}
                    </FavoriteList>
                  ) : null}
                  {historyVisible === true ? (
                    <RecipeList>
                      {userHistory
                        ? userHistory.map((triedrecipe) => {
                            return <HistoryTile recipe={triedrecipe} />;
                          })
                        : null}
                    </RecipeList>
                  ) : null}
                  {modalVisible ? (
                    <ModalDiv>
                      <DietModal
                        setSavedVisible={setSavedVisible}
                        onCancel={() => {
                          setModalVisible(false);
                          setFirstTimeModalVisible(false);
                        }}
                      />
                    </ModalDiv>
                  ) : null}
                  {reviewsVisible === true ? (
                    <ReviewsList>
                      {reviews.map((review) => {
                        if (review.author === currentUser.username) {
                          return <ReviewTile review={review}></ReviewTile>;
                        }
                      })}
                    </ReviewsList>
                  ) : null}

                  {savedVisible ? (
                    <UpdatedMessage>
                      Your preferences were saved!
                    </UpdatedMessage>
                  ) : null}
                </Content>
              </ProfilePage>
            </Main>
          </Body>
        </>
      ) : (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </>
  );
};

const Full = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Short = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const fade = keyframes`
  from{opacity:1}
  to{opacity:0}
  `;

const UpdatedMessage = styled.div`
  background-color: limegreen;
  width: 215px;
  padding: 7px;
  border-radius: 22px;
  box-shadow: 1px 1px 5px grey;
  position: absolute;
  left: 69%;
  top: 90%;
  color: white;
  z-index: 99;
  animation: ${fade} 1s 1.5s;
  animation-iteration-count: 1;

  @media (max-width: 768px) {
    left: 20%;
  }
`;

const TopDiv = styled.div``;

const NameDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 25%;
  font-size: 50px;
  background-color: white;
  @media (max-width: 768px) {
    font-size: 40px;
    padding-left: unset;
    justify-content: center;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderImage = styled.div`
  background-image: url(${profileHeader});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 25vh;
  /* width: 100%; */
  box-shadow: 1px 2px 6px #808080cf;
`;

const UserPictureDiv = styled.div`
  background-image: url(${avatar});
  background-position: center;
  border-radius: 50%;
  border: white solid 8px;
  z-index: 9;
  position: absolute;
  left: unset;
  top: 20%;
  width: 250px;
  height: 250px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfilePage = styled.div``;

const Button = styled.button`
  z-index: 8;
  position: absolute;
  top: -1px;
  left: 1300px;
  padding: 20px;
  background-color: white;
  &:hover {
    text-decoration: underline;
  }
`;

const TabsBar = styled.div`
  border: 1px grey solid;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: white;
  align-items: center;
  height: 50px;
  font-size: 20px;
  margin-left: 15%;
  @media (max-width: 768px) {
    flex-direction: column;
    height: unset;
    margin-left: unset;
  }
`;

const Favorites = styled.button`
  background-color: white;
  /* margin-right: 50px;
  margin-left: 50px; */
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 10px #80808085;
  }
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  padding: 10px;
`;

const RecipeHistory = styled.button`
  background-color: white;
  /* margin-right: 50px;
  margin-left: 50px; */
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 10px #80808085;
  }
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  padding: 10px;
`;

const Settings = styled.button`
  background-color: white;
  /* margin-right: 50px;
  margin-left: 50px; */
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 10px #80808085;
  }
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  padding: 10px;
`;

const Reviews = styled.button`
  background-color: white;
  /* margin-right: 50px;
  margin-left: 50px; */
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 10px #80808085;
  }
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  padding: 10px;
`;

const FavoriteList = styled.div`
  /* //favorites// */
  width: 50%;
  position: relative;
  left: 18%;
  border-top: 1px grey solid;
  border-right: 1px grey solid;
  text-align: center;

  padding-top: 40px;
`;

const RecipeList = styled.div`
  /* //history// */
  border-top: 1px grey solid;
  border-right: 1px grey solid;
  text-align: center;
  padding-top: 40px;
  width: 50%;
  position: relative;
  left: 35%;
`;

const ModalDiv = styled.div`
  position: relative;
  left: 60%;
  width: 30%;

  @media (max-width: 768px) {
    left: unset;
    width: unset;
  }
`;

const ReviewsList = styled.div`
  width: 60%;
  position: relative;
  left: 23%;
  padding-top: 30px;
`;

const Content = styled.div`
  justify-content: center;
  align-items: center;
  background: transparent;
`;

const Body = styled.div`
  background-image: url(${marble});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* width: 100%; */
  height: 100%;
  min-height: 100vh;
  @media (max-widtth: 768px) {
    min-height: 100vh;
  }
`;

const SpinnerContainer = styled.div`
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100vw;
`;

export default Profile;
