import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const NavBar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return <TopNav>Hello {currentUser.firstName}</TopNav>;
};

const TopNav = styled.div``;

export default NavBar;
