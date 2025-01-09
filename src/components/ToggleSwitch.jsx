import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
const Input = styled.input`
  opacity: 0;
  position: absolute;
`;
const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 32px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  &:before {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px; /* <!-- Make up for padding
    background: white;
    transform: translate(0, -50%);
  }
`;

const ToggleSwitch = ({ label }) => {
  return (
    <Label>
      <span>Toggle is off</span>
      <Input type="checkbox" />
      <Switch />
    </Label>
  );
};

export default ToggleSwitch;
