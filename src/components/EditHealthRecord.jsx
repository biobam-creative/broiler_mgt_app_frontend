import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";

import { PageWrapper, FormBox, Title, StyledButton } from "./styledComponents";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";

const EditHealthtRecord = () => {
  const { flockId, medicationId } = useParams();

  let [medication, setMedication] = useState({});

  let [date, setDate] = useState(null);
  let [mortality, setMortality] = useState(0);
  let [symptom, setSymptom] = useState("");
  let [medicationGiven, setMedicationGiven] = useState("");

  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getMedication() {
      const result = await httpServices.header.get(
        `/records/medication_details/${flockId}/${medicationId}`
      );
      setMedication(result.data);
      setDate(result.data.date);
      setMortality(result.data.mortality);
      setSymptom(result.data.symptom);
      setMedicationGiven(result.data.medication);
      console.log(result);
    }

    getMedication();
    // console.log(weight);
  }, [setMedication]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("mortality", mortality);
    formData.append("symptom", symptom);
    formData.append("medication", medicationGiven);

    console.log(formData);

    setLoading(true);
    const response = await httpServices.header.patch(
      config.apiUrl + `/records/medication_details/${flockId}/${medicationId}`,
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
          <Title>Edit Health Record</Title>
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
              placeholder="Mortality"
              type="number"
              label="Mortality"
              id="mortality"
              value={mortality}
              handleChange={(e) => setMortality(e.target.value)}
            />
            <InputField
              placeholder="Symptoms"
              type="text"
              label="Symptoms"
              id="symptoms"
              value={symptom}
              handleChange={(e) => setSymptom(e.target.value)}
            />
            <InputField
              placeholder="Medication"
              type="text"
              label="medication"
              id="medication"
              value={medicationGiven}
              handleChange={(e) => setMedicationGiven(e.target.value)}
            />

            <StyledButton primary>Update Health Record</StyledButton>
          </form>
        </FormBox>
      </div>
    </PageWrapper>
  );
};

export default EditHealthtRecord;
