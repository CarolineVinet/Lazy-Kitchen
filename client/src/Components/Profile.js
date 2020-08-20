import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <>
      <NavBar></NavBar>
      <Button>
        <HomeLink to="/homepage">Homepage</HomeLink>
      </Button>

      <ProfilePage>
        {currentUser.firstName}
        {""}
        {currentUser.lastName}
        This is the user profile
      </ProfilePage>
    </>
  );
};

const ProfilePage = styled.div``;

const Button = styled.button``;

const HomeLink = styled(Link)``;

export default Profile;
