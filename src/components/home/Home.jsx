import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import image from "../../assets/bookkeeping.svg";

import { StyledButton } from "../styledComponents";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto%;
  object-fit: cover;
  opacity: 0.8; /* Adjust opacity as needed */
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 100px; /* Adjust padding as needed */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center; /* Center vertically on larger screens */

  @media (max-width: 768px) {
    padding: 50px 20px;
  }
`;

const Title = styled.h1`
  font-family: "roboto";
  font-weight: bold;
  font-size: 2.5rem; /* Adjust font size as needed */
  margin-bottom: 20px;
  color: #333;
`;

const Subheading = styled.p`
  font-size: 1.2rem; /* Adjust font size as needed */
  font-family: "lato";
  line-height: 1.5;
  color: #777;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <Container>
      <ContentContainer>
        <Title>Revolutionize Your Broiler Farm</Title>
        <Subheading>
          Take control with our powerful management software. Increase
          efficiency, optimize feed usage, and maximize your profits.
        </Subheading>
        <ButtonContainer>
          <StyledButton onClick={handleSignupClick} primary>
            Get Started
          </StyledButton>
          <StyledButton onClick={handleLoginClick} secondary>
            Login
          </StyledButton>
        </ButtonContainer>
      </ContentContainer>
      <ImageContainer>
        <HeroImage src={image} alt="Broiler Management" />
      </ImageContainer>
    </Container>
  );
};

export default LandingPage;
