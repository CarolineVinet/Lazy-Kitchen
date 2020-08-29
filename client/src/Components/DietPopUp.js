import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const DietPopUp = ({ setPopUpVisible }) => {
  const { setFirstTimePopUpVisible } = useContext(CurrentUserContext);

  return (
    <Dark>
      <PopUp>
        <Message>Your account was created succesfully! </Message>

        <Instructions>
          Please take a moment to tell us about any allergies or dietary
          restrictions you may have. We'll make sure to keep those in mind when
          giving you recipe suggestions! Once you're done, head over to the
          Homepage to explore recipe ideas!
        </Instructions>
        <GotIt
          onClick={() => {
            setPopUpVisible(false);
            setFirstTimePopUpVisible(false);
          }}
        >
          Got it.
        </GotIt>
      </PopUp>
    </Dark>
  );
};

const Dark = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #060611b8;
  z-index: 99999999999999999999999999;
`;

const PopUp = styled.div`
  width: 25%;
  line-height: 1.5;
  position: absolute;
  left: 37.5%;
  top: 25%;
  align-items: center;
  background-color: white;
  padding: 15px;
  box-shadow: 1px 1px 5px grey;
  display: flex;
  flex-direction: column;
  /* z-index: 9999; */
`;

const Message = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 18px;
`;

const Instructions = styled.div`
  text-align: center;
  line-height: 2.1;
`;

const GotIt = styled.button`
  width: 80px;
  padding: 5px 0px;
  border-radius: 22px;
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

export default DietPopUp;
