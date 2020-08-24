import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import logo from "../assets/logolazy.png";

const NavBar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Bar>
      <Logo src={logo}></Logo>
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
`;

const Greeting = styled.div`
  font-size: 18px;
`;

export default NavBar;
