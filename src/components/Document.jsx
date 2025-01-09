import React, { useState } from "react";
import {
  FormBox,
  PageWrapper,
  SelectLabel,
  Select,
  StyledButton,
  Title,
} from "./styledComponents";
import InputField from "./InputField";
import Loading from "./Loading";
import { primaryColor } from "../constants";

import config from "../config.json";
import httpServices from "../services/httpServices";
import { generatePDF } from "../utility";

const Document = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [document, setDocument] = useState("");

  const [loading, setLoading] = useState(false);

  const btnDisabled = startDate && endDate && document ? false : true;

  const documentTypeOptions = [
    { value: "", label: "Select document type" },
    { value: "cash_flow", label: "Cash Flow" },
    { value: "profit_and_loss", label: "Profit and Loss Account" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", document);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);

    setLoading(true);
    const response = await httpServices.header.get(
      config.apiUrl + `/finance/document/${document}/${startDate}/${endDate}`
    );
    const logo =
      config.apiUrl.slice(0, 21) + "/media/" + localStorage.getItem("logo");
    const farmName = localStorage.getItem("farm_name");
    generatePDF(response.data, logo, farmName);
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
      <FormBox width="50vh">
        <Title>Input</Title>
        <form onSubmit={handleSubmit}>
          <SelectLabel htmlFor="document">Select Document Type</SelectLabel>
          <Select
            id="document"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          >
            {documentTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <InputField
            placeholder="Start Date"
            type="date"
            label="Start Date"
            id="start-date"
            value={startDate}
            handleChange={(e) => setStartDate(e.target.value)}
          />
          <InputField
            placeholder="End Date"
            type="date"
            label="End Date"
            id="end-date"
            value={endDate}
            handleChange={(e) => setEndDate(e.target.value)}
          />

          <StyledButton disabled={btnDisabled} primary>
            Download
          </StyledButton>
        </form>
      </FormBox>
    </PageWrapper>
  );
};

export default Document;
