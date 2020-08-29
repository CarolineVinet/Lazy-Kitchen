import React from "react";
import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <SpinnerIcon>
      <FaSpinner />
    </SpinnerIcon>
  );
};

const rotation = keyframes`
from{
    transform:rotate(0deg);
}
to{
    transform:rotate(360deg);
}
`;

const SpinnerIcon = styled.div`
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
  animation: ${rotation} 1000ms;
  animation-iteration-count: infinite;
`;

export default Spinner;
