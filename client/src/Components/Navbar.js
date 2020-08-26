import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import logo from "../assets/logolazy.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Bar>
      <Wrapper>
        <Button>
          <ProfileLink to="/profile"> My Profile</ProfileLink>
        </Button>
        <Logo src={logo}></Logo>
      </Wrapper>
      <Greeting>Hello {currentUser.firstName} !</Greeting>
    </Bar>
  );
};

const Bar = styled.div`
  border-bottom: 1px #8080803d solid;
  box-shadow: 2px 2px 10px #808080a3;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 5px;
  padding-left: 30px;
  padding-right: 30px;
  height: 50px;
  justify-content: space-between;
  background-color: white;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin-left: 20px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  padding: 10px;
  margin-right: 30px;
  background-color: white;
  &:hover {
    box-shadow: 1px 1px 10px #80808085;
  }
`;

const Greeting = styled.div`
  font-size: 18px;
`;

export default NavBar;
