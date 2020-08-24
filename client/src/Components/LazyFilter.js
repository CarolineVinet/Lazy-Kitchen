import React, { useContext } from "react";
import styled from "styled-components";
import { RiEmotionLine, RiEmotionNormalLine } from "react-icons/ri";
import { BiDizzy, BiSmile } from "react-icons/bi";
import { LazyContext } from "./LazyContext";

const LazyFilter = () => {
  const { setLazyFilter } = useContext(LazyContext);
  return (
    <RadioMenu>
      <RadioDiv>
        <Input
          onChange={() => {
            setLazyFilter("energized");
          }}
          type="radio"
          name="mood"
        ></Input>
        <RiEmotionLine
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
        />
      </RadioDiv>
      <RadioDiv>
        <Input
          onChange={() => {
            setLazyFilter("neutral");
          }}
          type="radio"
          name="mood"
        ></Input>
        <BiSmile
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
        />
      </RadioDiv>
      <RadioDiv>
        <Input
          onChange={() => {
            setLazyFilter("tired");
          }}
          type="radio"
          name="mood"
        ></Input>
        <RiEmotionNormalLine
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
        />
      </RadioDiv>
      <RadioDiv>
        <Input
          onChange={() => {
            setLazyFilter("deadtired");
          }}
          type="radio"
          name="mood"
        ></Input>
        <BiDizzy
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
        />
      </RadioDiv>
    </RadioMenu>
  );
};

const RadioMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Input = styled.input`
  cursor: pointer;
`;

export default LazyFilter;
