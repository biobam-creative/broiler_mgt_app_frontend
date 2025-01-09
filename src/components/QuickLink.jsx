import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const QuickCardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #87a536;
  padding: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  margin: 0.2rem;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const QuickLinkText = styled.p`
  display: flex;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
`;

const QuickLink = ({ icon, text, link }) => {
  return (
    <QuickCardLink to={link}>
      {icon}
      <QuickLinkText>{text}</QuickLinkText>
    </QuickCardLink>
  );
};

export default QuickLink;
