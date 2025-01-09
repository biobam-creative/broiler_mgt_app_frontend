import React, { useState } from "react";
import styled from "styled-components";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";

import { StyledButton } from "./styledComponents";
import { useNavigate, Link } from "react-router-dom";

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

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const btnDisabled = email ? false : true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    console.log(formData);

    setLoading(true);
    const response = await httpServices.header.post(
      config.apiUrl + "/user/request_password_reset",
      formData
    );
    if (response.status === 200) {
      navigate("/verification", { replace: true });
    }
    setLoading(false);
  };
  return (
    <PageWrapper>
      <Title>Password Reset</Title>
      <FormBox>
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Email"
            type="email"
            label="Email"
            id="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <StyledButton disabled={btnDisabled} primary>
            Reset Password
          </StyledButton>
        </form>
      </FormBox>
    </PageWrapper>
  );
};

export default PasswordReset;
