import React, { useContext } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const SignUp = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();
  return (
    <Form>
      <TextField
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
        placeholder="First Name"
      ></TextField>
      <TextField
        onChange={(event) => {
          setLastName(event.target.value);
        }}
        placeholder="Last Name"
      ></TextField>
      <TextField
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Email"
      ></TextField>
      <TextField
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        placeholder="Username"
      ></TextField>
      <TextField
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Password"
      ></TextField>

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
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log("user created!");
              setCurrentUser(data.user);
              history.push("/profile");
            });
        }}
      >
        Submit
      </SignUpButton>
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpButton = styled.button`
  margin-top: 20px;
  width: 60px;
  height: 40px;
`;

export default SignUp;
