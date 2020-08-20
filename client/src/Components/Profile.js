import React, { useContext } from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <>
      <NavBar />
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

export default Profile;
