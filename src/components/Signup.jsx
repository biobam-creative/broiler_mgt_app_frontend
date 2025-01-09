import React, { useState } from "react";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";

import { StyledButton, FormBox, Title, PageWrapper } from "./styledComponents";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const LoginText = styled(Link)`
  text-decoration: none;
  font-size: 1.1rem;
  color: #87a536;
`;

const Signup = () => {
  const [farmName, setFarmName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const btnDisabled =
    farmName && email && phone && logo && password && password2 ? false : true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("farmName", farmName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("logo", logo);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("website", website);

    console.log(formData);
    setLoading(true);
    const response = await httpServices.header.post(
      config.apiUrl + "/user/signup",
      formData
    );
    if (response.status === 200) {
      navigate("/verification", { replace: true });
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading ....</div>;
  }

  return (
    <PageWrapper>
      <FormBox width="50vw">
        <Title>Register</Title>
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Farm Name"
            type="text"
            label="Farm Name"
            id="farm-name"
            value={farmName}
            handleChange={(e) => setFarmName(e.target.value)}
          />
          <InputField
            placeholder="Email"
            type="email"
            label="Email"
            id="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            placeholder="Phone"
            type="text"
            label="Phone"
            id="phone"
            value={phone}
            handleChange={(e) => setPhone(e.target.value)}
          />
          <InputField
            placeholder="Logo"
            type="file"
            label="Logo"
            id="logo"
            value={logo}
            handleChange={(e) => setLogo(e.target.value)}
          />
          <InputField
            placeholder="Website"
            type="text"
            label="Website"
            id="website"
            value={website}
            handleChange={(e) => setWebsite(e.target.value)}
          />
          <InputField
            placeholder="Password"
            type="password"
            label="Password"
            id="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            placeholder="Confirm Password"
            type="password"
            label="Confirm Password"
            id="confirm-Password"
            value={password2}
            handleChange={(e) => setPassword2(e.target.value)}
          />
          <StyledButton disabled={btnDisabled} primary>
            Register
          </StyledButton>{" "}
          or <LoginText to="/login">Login</LoginText>
        </form>
      </FormBox>
    </PageWrapper>
  );
};

export default Signup;
