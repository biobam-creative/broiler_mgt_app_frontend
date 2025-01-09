import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import httpServices from "../services/httpServices";
import { login } from "../services/authService";
import styled from "styled-components";
import { StyledButton, FormBox } from "./styledComponents";
import InputField from "./InputField";
import {
  Avatar,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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

const ErrorMessage = styled.span`
  color: orange;
  font-family: roboto;
  font-size: 1rem;
`;

const LinkText = styled(Link)`
  color: #87a536;
  font-family: lato;
  font-size: 1rem;
  text-decoration: none;
  font-weight: w300;
`;

const TextSection = styled.div`
  text-align: center;
  margin: 1rem;
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const btnDisabled = email && password ? false : true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    await login(data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          localStorage.setItem("user_email", res.data.email);
          localStorage.setItem("farm_name", res.data.farm_name);
          localStorage.setItem("is_superuser", res.data.is_superuser);
          localStorage.setItem("phone", res.data.phone);
          localStorage.setItem("logo", res.data.logo);
          httpServices.header.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 404) {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  return (
    <PageWrapper>
      <FormBox width="50vw">
        <Title>Login</Title>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Email"
            type="email"
            label="Email"
            id="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            placeholder="Password"
            type="password"
            label="Password"
            id="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton disabled={btnDisabled} primary>
            Login
          </StyledButton>
        </form>
        <TextSection>
          New here? click to
          <LinkText to="/signup"> Sign up</LinkText>
        </TextSection>
        <TextSection>
          <LinkText to="/password-reset">Forgot password</LinkText>
        </TextSection>
      </FormBox>
    </PageWrapper>
  );
};
