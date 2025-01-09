import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";

import { PageWrapper, FormBox, Title, StyledButton } from "./styledComponents";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";

const EditFeedingRecord = () => {
  const { flockId, feedingId } = useParams();

  let [feeding, setFeeding] = useState({});

  let [date, setDate] = useState(null);
  let [type, setType] = useState("");
  let [quantity, setQuantity] = useState(0);

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getFeedingRecord() {
      const result = await httpServices.header.get(
        `/records/feeding_details/${flockId}/${feedingId}`
      );
      setFeeding(result.data);
      setDate(result.data.date);
      setType(result.data.type_of_feed_given);
      setQuantity(result.data.quantity);
      console.log(result);
    }

    getFeedingRecord();
  }, [setFeeding]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("type_of_feed_given", type);
    formData.append("quantity", quantity);

    console.log(formData);

    setLoading(true);
    const response = await httpServices.header.patch(
      config.apiUrl + `/records/feeding_details/${flockId}/${feedingId}`,
      formData
    );
    if (response.status === 200) {
      alert("Correction Effected");
    }
    setLoading(false);
  };
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <div>Loading ....</div>;
  }
  return (
    <PageWrapper>
      <div>
        <FormBox>
          <Title>Edit Feeding Record</Title>
          <form onSubmit={handleSubmit}>
            <InputField
              placeholder="Date"
              type="date"
              label="Date"
              id="date"
              value={date}
              handleChange={(e) => setDate(e.target.value)}
            />
            <InputField
              placeholder="Type"
              type="text"
              label="Type"
              id="type"
              value={type}
              handleChange={(e) => setType(e.target.value)}
            />
            <InputField
              placeholder="Quantity"
              type="number"
              label="Quantity"
              id="quantity"
              value={quantity}
              handleChange={(e) => setQuantity(e.target.value)}
            />

            <StyledButton primary>Update Feeding Record</StyledButton>
          </form>
        </FormBox>
      </div>
    </PageWrapper>
  );
};

export default EditFeedingRecord;
