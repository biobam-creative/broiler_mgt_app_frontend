import React from "react";
import styled from "styled-components";
import { primaryColor } from "../constants";

const Input = styled.input`
  width: 100%;
  color: ${({ type }) => (type !== "submit" ? "#87a536" : "#ffc107")};
  margin: 0.5rem;
  border: none;
  border-bottom: ${({ type }) =>
    type !== "submit" ? "1px solid #87a536" : "none"};
  border-radius: ${({ type }) => (type !== "submit" ? "none" : "5px")};
  // background-color: rgba(135, 165, 54, 0.3);
  height: 25px;

  &:focus {
    outline: none;
    background-color: #fff;
    border-bottom: ${({ type }) =>
      type !== "submit" ? "2px solid #87a536" : "none"};
    opacity: 1;
  }
`;

const Label = styled.label`
  color: #87a536;
  weight: w500;
  margin: 0.5rem;
`;

const InputField = ({ placeholder, type, label, id, value, handleChange }) => {
  return (
    <div>
      <div>
        <Label htmlFor={id}>{label}</Label>
      </div>
      <div>
        <Input
          placeholder={placeholder}
          type={type}
          id={id}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InputField;
