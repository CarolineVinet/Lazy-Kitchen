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
        <input
          onChange={() => {
            setLazyFilter("energized");
          }}
          type="radio"
          name="mood"
        ></input>
        <RiEmotionLine
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
        />
      </RadioDiv>
      <RadioDiv>
        <input
          onChange={() => {
            setLazyFilter("neutral");
          }}
          type="radio"
          name="mood"
        ></input>
        <BiSmile
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
        />
      </RadioDiv>
      <RadioDiv>
        <input
          onChange={() => {
            setLazyFilter("tired");
          }}
          type="radio"
          name="mood"
        ></input>
        <RiEmotionNormalLine
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
        />
      </RadioDiv>
      <RadioDiv>
        <input
          onChange={() => {
            setLazyFilter("deadtired");
          }}
          type="radio"
          name="mood"
        ></input>
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

// happy: sort by longest
// smile: no sorting
// meh: sort by shortest
// deadtired: set a max preptime & sort by shortest

const RadioMenu = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const RadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

export default LazyFilter;
