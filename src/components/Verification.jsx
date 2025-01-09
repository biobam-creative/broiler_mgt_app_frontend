import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 1.5rem;
  text-align: center;
  font-family: "lato";
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: #87a536;
  font-size: 1.8rem;
  font-weight: bold;
`;

const Verification = () => {
  return (
    <PageWrapper>
      <Text>
        A verification mail has been sent to your email. kindly verify your
        email and <LoginLink to="/login">Login</LoginLink>
      </Text>
    </PageWrapper>
  );
};

export default Verification;
