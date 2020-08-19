import React from "react";
import styled from "styled-components";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
          console.log("Retrieving your profile...");
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
              console.log(data);
            });
        }}
      >
        {" "}
        Let's go!
      </Button>
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

export default SignIn;
