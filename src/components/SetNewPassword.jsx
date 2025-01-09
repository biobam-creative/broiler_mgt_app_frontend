import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputField from "./InputField";
import { StyledButton } from "./styledComponents";
import header from "../services/httpServices";
import config from "../config.json";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #87a536;
  font-size: 1.3rem;
`;

const FormBox = styled.div`
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 80vh;
  border-radius: 10px;
`;

const SetNewPassword = () => {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const btnDisabled = password && password === password2 ? false : true;

  const handleSubmit = async (e) => {
    const data = {
      password: password,
      uidb64: uidb64,
      token: token,
    };
    e.preventDefault();
    console.log("Clicked");
    await header.header
      .patch(`${config.apiUrl}/user/password_reset_complete`, data)
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
      });
  };

  return (
    <PageWrapper>
      <Title>Set New Password</Title>
      <FormBox>
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Enter New Password"
            type="password"
            label="Password"
            id="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            placeholder="Confirm New Password"
            type="password"
            label="Confirm Password"
            id="password2"
            value={password2}
            handleChange={(e) => setPassword2(e.target.value)}
          />
          <StyledButton disabled={btnDisabled} primary>
            Reset Password
          </StyledButton>
        </form>
      </FormBox>
    </PageWrapper>
  );
};

export default SetNewPassword;
