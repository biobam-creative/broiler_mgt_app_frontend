import React from "react";
import ReactLoading from "react-loading";
import { LoadingContainer } from "./styledComponents";

const Loading = ({ type, color, className }) => (
  <LoadingContainer>
    <ReactLoading
      type={type}
      color={color}
      className={className}
      height={"10%"}
      width={"10%"}
    />
  </LoadingContainer>
);

export default Loading;
