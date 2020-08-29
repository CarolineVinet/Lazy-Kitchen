import React, { useContext } from "react";
import styled from "styled-components";
import {
  RiEmotionLine,
  RiEmotionNormalLine,
  RiEmotionFill,
  RiEmotionNormalFill,
} from "react-icons/ri";
import { FaRegSmile, FaSmile, FaDizzy, FaRegDizzy } from "react-icons/fa";

import { LazyContext } from "./LazyContext";

const LazyFilter = () => {
  const { setLazyFilter } = useContext(LazyContext);
  const [sliderValue, setSliderValue] = React.useState(2);
  const [happyMood, setHappyMood] = React.useState(false);
  const [normalMood, setNormalMood] = React.useState(false);
  const [tiredMood, setTiredMood] = React.useState(false);
  const [deadMood, setDeadMood] = React.useState(false);

  return (
    <FilterSection>
      <RadioMenu>
        <Slider
          onChange={(event) => {
            event.preventDefault();

            const value = parseInt(event.target.value);

            if (value === 1) {
              setLazyFilter("energized");
              setHappyMood(true);
              setNormalMood(false);
              setTiredMood(false);
              setDeadMood(false);
            } else if (value === 2) {
              setLazyFilter("neutral");
              setNormalMood(true);
              setHappyMood(false);
              setTiredMood(false);
              setDeadMood(false);
            } else if (value === 3) {
              setLazyFilter("tired");
              setTiredMood(true);
              setHappyMood(false);
              setNormalMood(false);
              setDeadMood(false);
            } else if (value === 4) {
              setLazyFilter("deadtired");
              setDeadMood(true);
              setHappyMood(false);
              setNormalMood(false);
              setTiredMood(false);
            }
            setSliderValue(value);
          }}
          type="range"
          min="1"
          max="4"
          value={sliderValue}
        ></Slider>
      </RadioMenu>

      <Emojis>
        <RadioDiv title="Energized">
          {happyMood === false ? (
            <RiEmotionLine
              style={{
                height: "30px",
                width: "30px",
                margin: "10px",
              }}
            />
          ) : (
            <RiEmotionFill
              style={{
                height: "30px",
                width: "30px",
                margin: "10px",
                color: "#0075ff",
              }}
            />
          )}
          <EmojiName>Energized</EmojiName>
        </RadioDiv>

        <RadioDiv title="Good">
          {normalMood === false ? (
            <FaRegSmile
              style={{
                height: "26px",
                width: "26px",
                margin: "10px",
                marginTop: "12px",
              }}
            />
          ) : (
            <FaSmile
              style={{
                height: "26px",
                width: "26px",
                margin: "10px",
                marginTop: "12px",
                marginBottom: "12px",
                color: "0075ff",
              }}
            />
          )}
          <EmojiName>Normal</EmojiName>
        </RadioDiv>

        <RadioDiv title="Tired">
          {tiredMood === false ? (
            <RiEmotionNormalLine
              style={{
                height: "30px",
                width: "30px",
                margin: "10px",
              }}
            />
          ) : (
            <RiEmotionNormalFill
              style={{
                height: "30px",
                width: "30px",
                margin: "10px",
                color: "0075ff",
              }}
            />
          )}
          <EmojiName>Tired</EmojiName>
        </RadioDiv>

        <RadioDiv title="Dead Tired">
          {deadMood === false ? (
            <FaRegDizzy
              style={{
                height: "26px",
                width: "26px",
                margin: "10px",
                marginTop: "12px",
              }}
            />
          ) : (
            <FaDizzy
              style={{
                height: "26px",
                width: "26px",
                margin: "10px",
                marginTop: "12px",
                color: "0075ff",
              }}
            />
          )}
          <EmojiName>Dead Tired</EmojiName>
        </RadioDiv>
      </Emojis>
    </FilterSection>
  );
};

const Emojis = styled.div`
  display: flex;
  flex-direction: row;
`;

const EmojiName = styled.p`
  font-size: 12px;
  text-align: center;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Slider = styled.input`
  width: 100%;
`;

const RadioMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 230px;
`;

const RadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-right: 10px;
  margin-left: 10px;
`;

export default LazyFilter;
