import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const SignUp = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [existingUserError, setExistingUserError] = React.useState(false);
  const [allFieldsNotFilledError, setAllFieldsNotFilledError] = React.useState(
    false
  );
  const {
    setCurrentUser,
    setFirstTimeModalVisible,
    setFirstTimePopUpVisible,
  } = useContext(CurrentUserContext);
  const history = useHistory();

  return (
    <Form>
      <Input
        required
        onChange={(event) => {
          setFirstName(event.target.value);
          setExistingUserError(false);
          setAllFieldsNotFilledError(false);
        }}
        placeholder="First Name"
        value={firstName}
      ></Input>
      <Input
        required
        onChange={(event) => {
          setLastName(event.target.value);
          setExistingUserError(false);
          setAllFieldsNotFilledError(false);
        }}
        placeholder="Last Name"
        value={lastName}
      ></Input>
      <Input
        required
        onChange={(event) => {
          setEmail(event.target.value);
          setExistingUserError(false);
          setAllFieldsNotFilledError(false);
        }}
        placeholder="Email"
        value={email}
      ></Input>
      <Input
        required
        onChange={(event) => {
          setUsername(event.target.value);
          setExistingUserError(false);
          setAllFieldsNotFilledError(false);
        }}
        placeholder="Username"
        value={username}
      ></Input>
      <Input
        required
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
          setExistingUserError(false);
          setAllFieldsNotFilledError(false);
        }}
        placeholder="Password"
        value={password}
      ></Input>

      <SignUpButton
        onClick={() => {
          console.log("data incoming");
          setAllFieldsNotFilledError(false);

          if (!firstName || !lastName || !email || !username || !password) {
            setAllFieldsNotFilledError(true);
          } else {
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
                  setLastName("");
                  setFirstName("");
                  setUsername("");
                  setEmail("");
                  setPassword("");
                } else if (data.status === 201) {
                  console.log("user created!");
                  setCurrentUser(data.user);
                  setFirstTimeModalVisible(true);
                  setFirstTimePopUpVisible(true);
                  history.push("/profile");
                }
              });
          }
        }}
      >
        Submit
      </SignUpButton>

      {existingUserError ? (
        <ErrorMessage>
          Looks like you already have an account. Try signing in!
        </ErrorMessage>
      ) : null}

      {allFieldsNotFilledError ? (
        <ErrorMessage>
          Please fill out all fields before submitting!
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

const Input = styled.input`
  text-align: center;
  padding: 5px;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
`;

const SignUpButton = styled.button`
  margin-top: 15px;
  width: 70px;
  height: 30px;
  border-radius: 22px;
  padding-right: 7px;
  padding-left: 7px;
  box-shadow: 1px 1px 5px grey;
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
  margin-top: 15px;
  font-size: 16px;
`;

export default SignUp;
