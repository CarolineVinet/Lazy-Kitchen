import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const SignUp = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [existingUserError, setExistingUserError] = React.useState(false);
  const { setCurrentUser, setFirstTimeModalVisible } = useContext(
    CurrentUserContext
  );
  const history = useHistory();

  return (
    <Form>
      <Input
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
        placeholder="First Name"
      ></Input>
      <Input
        onChange={(event) => {
          setLastName(event.target.value);
        }}
        placeholder="Last Name"
      ></Input>
      <Input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Email"
      ></Input>
      <Input
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        placeholder="Username"
      ></Input>
      <Input
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Password"
      ></Input>

      <SignUpButton
        onClick={() => {
          console.log("data incoming");
          fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              username: username,
              password: password,
              favorites: [],
              history: [],
              allergies: [],
              diet: [],
              avoid: "",
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log("RETURNING DATA SIGNUP LINE 74 ::", data);
              if (data.status === 400) {
                setExistingUserError(true);
              } else if (data.status === 201) {
                console.log("user created!");
                setCurrentUser(data.user);
                setFirstTimeModalVisible(true);
                history.push("/profile");
              }
            });
        }}
      >
        Submit
      </SignUpButton>

      {existingUserError ? (
        <ErrorMessage>
          Looks like you already have an account. Try signing in!
        </ErrorMessage>
      ) : null}
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input``;

const SignUpButton = styled.button`
  margin-top: 20px;
  width: 60px;
  height: 40px;
`;

const ErrorMessage = styled.div``;

export default SignUp;
