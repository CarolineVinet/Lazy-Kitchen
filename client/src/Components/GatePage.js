import React from "react";
import styled from "styled-components";
import SignUp from "./SignUpForm";
import { Link } from "react-router-dom";

const Gate = () => {
  return (
    <GatePage>
      You have to sign up to continue!
      <SignUp />
      <p>
        Already have an account? <LinkDiv to="/signin">Sign in</LinkDiv>
      </p>
    </GatePage>
  );
};

const GatePage = styled.div``;

const LinkDiv = styled(Link)`
  text-decoration: none;
`;

export default Gate;
