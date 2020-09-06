import React, { useContext } from "react";
import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";

import { CurrentUserContext } from "./CurrentUserContext";

const AddPicture = () => {
  const [image, setImage] = React.useState({});
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [uploaderOpen, setUploaderOpen] = React.useState(false);

  const fileOnChange = (event) => {
    setImage(event.target.files[0]);

    const realFileInput = document.getElementById("real");
    const fileNameSpan = document.getElementById("imagetitle");

    if (realFileInput.value) {
      fileNameSpan.innerText = realFileInput.value;
    } else {
      fileNameSpan.innerText = "No file chosen, yet.";
    }
  };

  const sendImage = (event) => {
    let formData = new FormData();

    formData.append("profilepic", image);

    fetch(`http://localhost:4000/uploadFile?id=${currentUser._id}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resBody) => {
        document.getElementById("imagetitle").innerText =
          "No file chosen, yet.";

        setCurrentUser({
          ...currentUser,
          avatarUrl: resBody.avatarUrl,
        });
        setUploaderOpen(false);
      });
  };

  const fakeOnClick = () => {
    const realFileInput = document.getElementById("real");

    realFileInput.click();
  };

  return (
    <BigWrapper>
      <Input
        type="file"
        id="real"
        hidden="hidden"
        onChange={fileOnChange}
      ></Input>
      <Opener
        onClick={() => {
          if (uploaderOpen === false) {
            setUploaderOpen(true);
          } else if (uploaderOpen === true) {
            setUploaderOpen(false);
          }
        }}
      >
        <BsPlusCircle
          style={{ height: "30px", width: "30px", color: "grey" }}
        />
      </Opener>

      {uploaderOpen ? (
        <Wrapper>
          <FakeInput onClick={fakeOnClick} id="fake">
            Choose Photo
          </FakeInput>

          <Span id="imagetitle">No file chosen, yet.</Span>
          <Button onClick={sendImage}>Upload</Button>
        </Wrapper>
      ) : null}
    </BigWrapper>
  );
};

const BigWrapper = styled.div`
  padding: 5px 0px;
  align-items: flex-end;
  background-color: transparent;
  z-index: 9999;
  width: 15%;
  position: fixed;
  top: 47%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
`;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 22px;
  box-shadow: 1px 1px 5px grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
`;

const Opener = styled.button`
  margin-left: 75%;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding: 1px;
  display: flex;
  background-color: white;
  height: 35px;
  width: 35px;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    box-shadow: 1px 1px 5px grey;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const Span = styled.span``;

const Input = styled.input``;

const Button = styled.button`
  background-color: white;
  padding: 5px;
  border-radius: 22px;
  border: grey 1px solid;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const FakeInput = styled.button`
  background-color: white;
  padding: 5px;
  border-radius: 22px;
  border: grey 1px solid;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

export default AddPicture;
