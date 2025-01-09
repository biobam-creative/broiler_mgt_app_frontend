import React, { useState } from "react";
import styled from "styled-components";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";

import { StyledButton, FormBox, PageWrapper, Title } from "./styledComponents";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";
import { primaryColor } from "../constants";
import Swal from "sweetalert2";

// const FormBox = styled.div`
//   padding: 1.2rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
//   width: 400px;
//   height: 80vh;
//   border-radius: 10px;
// `;

// const PageWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const Title = styled.h1`
//   color: #87a536;
//   font-size: 1.3rem;
// `;

const AddFlock = () => {
  const [flockName, setFlockName] = useState("");
  const [breed, setBreed] = useState("");
  const [date, setDate] = useState("");
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(0);
  const [age, setAge] = useState(0);
  const [image, setImage] = useState();
  const [weight, setWeight] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const btnDisabled =
    flockName && breed && date && number && age ? false : true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("flockName", flockName);
    formData.append("breed", breed);
    formData.append("date", date);
    formData.append("number", number);
    formData.append("age", age);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("weight", weight);

    setLoading(true);
    try {
      const response = await httpServices.header.post(
        config.apiUrl + "/records/flock",
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Sucessful",
          text: "Flock Added Successfully",
          icon: "success",
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      // setError(error);
      if (error.response) {
        if (error.response.status === 401) {
          Swal.fire({
            title: "Error",
            text: "Your session has expired please login again",
            icon: "info",
          });
          navigate("/login", { replace: true });
        } else if (error.response.status === 400) {
          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "info",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "An Error occured from our side wait while we fix it",
            icon: "info",
          });
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "A network error occured, please check your internet connection",
          icon: "info",
        });
      }
    } finally {
      setLoading(false);
    }

    // if (response.status === 200) {
    //   Swal.fire({
    //     title: "Sucessful",
    //     text: "Flock Added Successfully",
    //     icon: "success",
    //   });
    //   navigate("/dashboard", { replace: true });
    // } else if (response.status >= 500) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "Server Error, We are on it",
    //     icon: "error",
    //   });
    //   // navigate("/dashboard", { replace: true });
    // } else if (response.status === 400) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "please check your inputs",
    //     icon: "error",
    //   });
    //   // navigate("/dashboard", { replace: true });
    // }
    setLoading(false);
  };
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <Loading type={"spin"} color={primaryColor} />;
  }
  return (
    <PageWrapper>
      <FormBox height="100%" width="50vw">
        <Title>Add Flock</Title>
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Flock Name"
            type="text"
            label="Flock Name"
            id="flock-name"
            value={flockName}
            handleChange={(e) => setFlockName(e.target.value)}
          />
          <InputField
            placeholder="Breed"
            type="text"
            label="Breed"
            id="breed"
            value={breed}
            handleChange={(e) => setBreed(e.target.value)}
          />
          <InputField
            placeholder="Arrival Date"
            type="date"
            label="Arrival Date"
            id="date"
            value={date}
            handleChange={(e) => setDate(e.target.value)}
          />
          <InputField
            placeholder="Price Per Bird"
            type="number"
            label="Price Per Bird"
            id="price"
            value={price}
            handleChange={(e) => setPrice(e.target.value)}
          />
          <InputField
            placeholder="Number"
            type="number"
            label="Number"
            id="number"
            value={number}
            handleChange={(e) => setNumber(e.target.value)}
          />
          <InputField
            placeholder="Weight in gram"
            type="number"
            label="Weight"
            id="weight"
            value={weight}
            handleChange={(e) => setWeight(e.target.value)}
          />
          <InputField
            placeholder="Age"
            type="number"
            label="Age"
            id="age"
            value={age}
            handleChange={(e) => setAge(e.target.value)}
          />
          <InputField
            placeholder="Image"
            type="file"
            label="Image"
            id="image"
            value={image}
            handleChange={(e) => setImage(e.target.value)}
          />
          <StyledButton disabled={btnDisabled} primary>
            Add Flock
          </StyledButton>
        </form>
      </FormBox>
    </PageWrapper>
  );
};

export default AddFlock;
