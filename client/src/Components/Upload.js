import React, { useState } from "react";
import styled from "styled-components";

const AddPicture = () => {
  const [image, setImage] = React.useState({});

  const fileOnChange = (event) => {
    setImage(event.target.files[0]);
  };

  const sendImage = (event) => {
    let formData = new FormData();

    formData.append("profilepic", image);

    fetch("http://localhost:4000/uploadFile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((resBody) => {
        console.log(resBody);
      });
  };

  return (
    <Wrapper>
      <Input type="file" onChange={fileOnChange}></Input>
      <Button onClick={sendImage}>Upload</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: red solid 3px;
`;

const Input = styled.input``;

const Button = styled.button`
  background-color: pink;
`;

export default AddPicture;
