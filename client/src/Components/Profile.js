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
import { ReviewsContext } from "./ReviewsContext";
import ReviewTile from "./ReviewTile";

const Profile = () => {
  const {
    currentUser,
    firstTimeModalVisible,
    setFirstTimeModalVisible,
  } = useContext(CurrentUserContext);
  const { reviews } = useContext(ReviewsContext);
  const [userFavorites, setUserFavorites] = React.useState([]);
  const [userHistory, setUserHistory] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(firstTimeModalVisible);

  const [favoritesVisible, setFavoritesVisible] = React.useState(false);
  const [historyVisible, setHistoryVisible] = React.useState(false);
  const [reviewsVisible, setReviewsVisible] = React.useState(false);

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
          console.log("recipe array data :: ", data);
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
      <NavBar></NavBar>
      <Button>
        <HomeLink to="/homepage">Homepage</HomeLink>
      </Button>

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
              Your favorite recipes
            </Favorites>

            <RecipeHistory
              onClick={() => {
                setHistoryVisible(!historyVisible);
                setFavoritesVisible(false);
                setReviewsVisible(false);
                setModalVisible(false);
              }}
            >
              Your recipe history
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
              Edit your dietary preferences
            </Settings>

            <Reviews
              onClick={() => {
                setReviewsVisible(!reviewsVisible);
                setHistoryVisible(false);
                setModalVisible(false);
                setFavoritesVisible(false);
              }}
            >
              Your reviews
            </Reviews>
          </TabsBar>
          <Content>
            {favoritesVisible === true ? (
              <FavoriteList>
                {userFavorites.map((favorite) => {
                  return <RecipeTile recipe={favorite} />;
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
                <CloseButton
                  onClick={() => {
                    setModalVisible(false);
                    setFirstTimeModalVisible(false);
                  }}
                >
                  X
                </CloseButton>
                <DietModal />
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
          </Content>
        </ProfilePage>
      </Main>
    </>
  );
};

const TopDiv = styled.div``;

const NameDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 25%;
  font-size: 50px;
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
  width: 100%;
  box-shadow: 1px 2px 6px #808080cf;
`;

const UserPictureDiv = styled.div`
  background-image: url(${userpic});
  background-position: center;
  border-radius: 50%;
  border: white solid 8px;
  z-index: 9;
  position: absolute;
  left: 3%;
  top: 20%;
  width: 280px;
  height: 280px;
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
  border: 1px grey solid;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  font-size: 20px;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
`;

const Favorites = styled.button`
  background-color: white;
  margin-right: 50px;
  margin-left: 50px;
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
  margin-right: 50px;
  margin-left: 50px;
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
  margin-right: 50px;
  margin-left: 50px;
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
  margin-right: 50px;
  margin-left: 50px;
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
  margin-top: 40px;
  padding-top: 40px;
`;

const RecipeList = styled.div`
  /* //history// */
  border-top: 1px grey solid;
  border-right: 1px grey solid;
  text-align: center;
  margin-top: 40px;
  padding-top: 40px;
  width: 50%;
  position: relative;
  left: 42%;
`;

const ModalDiv = styled.div`
  position: relative;
  left: 60%;
`;

const CloseButton = styled.button``;

const ReviewsList = styled.div``;

const Content = styled.div`
  justify-content: center;
  align-items: center;
`;

export default Profile;
