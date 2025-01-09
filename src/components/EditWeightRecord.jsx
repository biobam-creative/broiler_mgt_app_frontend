import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";

import { PageWrapper, FormBox, Title, StyledButton } from "./styledComponents";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { primaryColor } from "../constants";

// const FormBox = styled.div`
//   padding: 1.2rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
//   width: 400px;
//   border-radius: 10px;
//   height: 50vh;
//   width: 50vw;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

const EditWeightRecord = () => {
  const { flockId, weightId } = useParams();

  let [weight, setWeight] = useState({});

  let [date, setDate] = useState(null);
  let [number, setNumber] = useState(0);
  let [averageWeight, setAverageWeight] = useState(0);

  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const btnDisabled = date && number && averageWeight ? false : true;

  useEffect(() => {
    async function getWeight() {
      const result = await httpServices.header.get(
        `/records/weight_details/${flockId}/${weightId}`
      );
      setWeight(result.data);
      setDate(result.data.date_taken);
      setNumber(result.data.number_of_birds);
      setAverageWeight(result.data.average_weight);
      console.log(result);
    }

    getWeight();
    console.log(weight);
  }, [setWeight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date_taken", date);
    formData.append("number_of_birds", number);
    formData.append("average_weight", averageWeight);

    setLoading(true);
    const response = await httpServices.header.patch(
      config.apiUrl + `/records/weight_details/${flockId}/${weightId}`,
      formData
    );
    if (response.status === 200) {
      setWeight(response.data);
      alert("Correction Effected");
      // navigate("/.", { replace: true });
    }
    setLoading(false);
  };
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <Loading type={"spinner"} color={primaryColor} />;
  }
  return (
    <PageWrapper>
      <div>
        <FormBox>
          <Title>Edit Weight Record</Title>
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
              placeholder="Number of Birds Weighed"
              type="number"
              label="Number of Birds Weighed"
              id="number-of-birds"
              value={number}
              handleChange={(e) => setNumber(e.target.value)}
            />
            <InputField
              placeholder="Average Weight"
              type="number"
              label="Average Weight"
              id="average-weight"
              value={averageWeight}
              handleChange={(e) => setAverageWeight(e.target.value)}
            />

            <StyledButton disabled={btnDisabled} primary>
              Update Weight Record
            </StyledButton>
          </form>
        </FormBox>
      </div>
    </PageWrapper>
  );
};

export default EditWeightRecord;
