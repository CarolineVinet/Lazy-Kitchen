import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import signinImage from "../assets/signinimage.jpg";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userDoesntExist, setUserDoesntExist] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [requiredFieldsError, setRequiredFieldsError] = React.useState(false);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  return (
    <Main>
      <Text>
        <Greeting>Welcome back!</Greeting>
        <Form>
          <Instruction>Sign in and let's get cooking!</Instruction>
          <Input
            required
            onChange={(event) => {
              setEmail(event.target.value);
              setInvalidPassword(false);
              setRequiredFieldsError(false);
              setUserDoesntExist(false);
            }}
            placeholder="Email"
            value={email}
          ></Input>
          <Input
            required
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
              setInvalidPassword(false);
              setRequiredFieldsError(false);
              setUserDoesntExist(false);
            }}
            placeholder="Password"
            value={password}
          ></Input>
          <Button
            onClick={() => {
              setRequiredFieldsError(false);
              if (!email || !password) {
                setRequiredFieldsError(true);
              } else {
                fetch(`/signin?email=${email}&password=${password}`, {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    if (data.status === 200) {
                      setCurrentUser(data.user);
                      history.push("/homepage");
                    } else if (data.status === 400) {
                      setInvalidPassword(true);
                    } else if (data.status === 404) {
                      setUserDoesntExist(true);
                    }
                  });
              }
            }}
          >
            {" "}
            Let's go!
          </Button>

          {userDoesntExist ? (
            <ErrorMessage>
              Hmm... <br></br>The email you entered isn't in our database.
              <br></br>
              <LinkDiv to="/">Sign up here!</LinkDiv>
            </ErrorMessage>
          ) : null}

          {invalidPassword ? (
            <ErrorMessage>
              The password you have entered is invalid. Please try again.
            </ErrorMessage>
          ) : null}

          {requiredFieldsError ? (
            <ErrorMessage>
              Please fill out all fields before submitting!
            </ErrorMessage>
          ) : null}
        </Form>
      </Text>
    </Main>
  );
};

const Main = styled.div`
  background-image: url(${signinImage});
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
  position: relative;
  width: 30%;
  left: 65%;
  top: 23%;
`;

const Instruction = styled.p`
  font-size: 26px;
  margin-bottom: 20px;
  padding: 15px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 1px 1px 8px grey;
`;

const Greeting = styled.h1`
  font-size: 60px;
  margin-bottom: 60px;
  background: transparent;
`;

const Input = styled.input`
  text-align: left;
  padding: 5px;
  font-size: 20px;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 75px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 22px;
  box-shadow: 1px 1px 5px grey;
  height: 40px;
  margin-top: 15px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

const LinkDiv = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default SignIn;
