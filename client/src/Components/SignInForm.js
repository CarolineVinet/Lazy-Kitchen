import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userDoesntExist, setUserDoesntExist] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  return (
    <Form>
      <Input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Email"
      ></Input>
      <Input
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Password"
      ></Input>
      <Button
        onClick={() => {
          if (email === "" || password === "") {
            return;
          }
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
        }}
      >
        {" "}
        Let's go!
      </Button>

      {userDoesntExist ? (
        <ErrorMessage>
          User not found! <LinkDiv to="/">Sign up here!</LinkDiv>
        </ErrorMessage>
      ) : null}

      {invalidPassword ? (
        <ErrorMessage>
          The password you have entered is invalid. Please try again.
        </ErrorMessage>
      ) : null}
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input``;

const Button = styled.button``;

const ErrorMessage = styled.div`
  color: red;
`;

const LinkDiv = styled(Link)``;

export default SignIn;
