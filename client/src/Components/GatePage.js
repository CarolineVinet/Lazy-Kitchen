import React from "react";
import styled from "styled-components";
import SignUp from "./SignUpForm";
import { Link } from "react-router-dom";
import gateBackground from "../assets/gatebackground.jpg";

const Gate = () => {
  return (
    <GatePage>
      <Text>
        <HOne>Lazy Kitchen</HOne>
        <GateTwo>
          <Intro>
            Don't know what to cook? Feeling lazy? <br></br>We've got you!
          </Intro>
          <Introo>
            Tell us how much energy you have and we'll deliver awesome recipes
            tailored to your dietary profile!
          </Introo>
          <HTwo>Sign up to access our recipe generator!</HTwo>
          <Instructions>It's quick & easy and completely free!</Instructions>
          <SignUp />
          <SigninRedirect>
            Already have an account?{" "}
            <LinkDiv to="/signin">Sign in here.</LinkDiv>
          </SigninRedirect>
        </GateTwo>
      </Text>
    </GatePage>
  );
};

const GatePage = styled.div`
  background-image: url(${gateBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
`;

const Text = styled.div`
  z-index: 1;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  position: relative;
  left: 35%;
  top: 5%;
`;

const HOne = styled.h1`
  font-size: 55px;
  margin-bottom: 40px;
  background: transparent;
`;

const Intro = styled.p`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 25px;
`;

const Introo = styled.p`
  text-align: center;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 20px;
`;

const HTwo = styled.p`
  text-align: center;
  margin-top: 15px;
  font-size: 25px;
`;

const Instructions = styled.p`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 18px;
`;

const GateTwo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  line-height: 1;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 1px 1px 8px grey;
`;

const LinkDiv = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
`;

const SigninRedirect = styled.p`
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export default Gate;
