import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import httpServices from "../services/httpServices";
import config from "../config.json";
import InputField from "./InputField";
import Switch from "react-switch";
import Swal from "sweetalert2";
import { useAlert } from "react-alert";

import {
  LoadingContainer,
  StyledButton,
  DeleteButton,
  PageWrapper,
  FormBox,
  RecordSection,
  ChartSection,
  RightDiv,
  Title,
  TableData,
  TableHeader,
  TopComponent,
  VaccineCard,
  VaccineName,
  VaccineButton,
  VaccineAge,
  VaccineCenter,
  VaccineDates,
  VaccineLeft,
  Warning,
} from "./styledComponents";
import Loading from "./Loading";
import { primaryColor } from "../constants";

const Health = () => {
  const alert = useAlert();

  const { flockId } = useParams();

  const [dailyVaccinations, setDailyVaccinations] = useState([]);
  const [medications, setMedications] = useState([]);

  const [date, setDate] = useState(null);
  const [mortality, setMortality] = useState(0);
  const [symptoms, setSymptoms] = useState("");
  const [medication, setMedication] = useState("");

  const handleVaccineChange = async (dailyVaccination) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;

    const data = {
      administered: !dailyVaccination.administered,
      date_given: dailyVaccination.date_given ? null : currentDate,
    };

    const response = await httpServices.header.patch(
      config.apiUrl +
        `/records/daily_vaccination_details/${flockId}/${dailyVaccination.id}`,
      data
    );
    if (response.status === 200) {
      dailyVaccination.administered = data.administered;
      setDailyVaccinations(response.data);
    }
  };

  const btnDisabled = date && symptoms && medication ? false : true;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMedications() {
      const result = await httpServices.header.get(
        `/records/medication/${flockId}`
      );
      setMedications(result.data);
      console.log(medications);
    }
    async function getDailyVaccinationProgramme() {
      const result = await httpServices.header.get(
        `/records/daily_vaccination/${flockId}`
      );
      setDailyVaccinations(result.data);
    }
    getDailyVaccinationProgramme();
    getMedications();
  }, [setMedications, setDailyVaccinations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("flock_id", flockId);
    formData.append("date", date);
    formData.append("mortality", mortality);
    formData.append("symptoms", symptoms);
    formData.append("medication", medication);

    console.log(formData);

    setLoading(true);
    const response = await httpServices.header.post(
      config.apiUrl + `/records/medication/${flockId}`,
      formData
    );
    if (response.status === 200) {
      setMedications(response.data);
      Swal.fire({
        title: "Sucessful",
        text: "Record Added Successfully",
        icon: "success",
      });
    }
    setLoading(false);
  };

  const handleDelete = async (medication) => {
    setLoading(true);
    const index = medications.indexOf(medication);
    const response = await httpServices.header.delete(
      config.apiUrl + `/records/medication_details/${flockId}/${medication.id}`
    );
    if (response.status === 200) {
      let remMedications = medications.splice(index, 1);
      setMedications(response.data);
      console.log(index, medications);
      alert("Entry Deleted");
    }
    setLoading(false);
    // alert.error("hello", {
    //   containerStyle: {
    //     backgroundColor: "red",
    //   },
    // });
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
      <TopComponent>
        <FormBox width="40vw">
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
              value={symptoms}
              handleChange={(e) => setSymptoms(e.target.value)}
            />
            <InputField
              placeholder="Medication"
              type="text"
              label="Medication"
              id="medication"
              value={medication}
              handleChange={(e) => setMedication(e.target.value)}
            />

            <StyledButton disabled={btnDisabled} primary>
              Add Medication Record
            </StyledButton>
          </form>
        </FormBox>
        <RightDiv>
          <Title>Vaccination Programme</Title>
          <Warning>
            Note: Please consult a veterinary officer when administering
            vaccines and medications
          </Warning>
          {dailyVaccinations.map((dailyVaccination) => (
            <VaccineCard
              given={dailyVaccination.administered}
              key={dailyVaccination.id}
            >
              <VaccineLeft>
                {/* <VaccineAge>{dailyVaccination.age}</VaccineAge> */}
                <VaccineDates>{dailyVaccination.date_to_be_given}</VaccineDates>
                <VaccineCenter>
                  <VaccineName>{dailyVaccination.vaccine}</VaccineName>
                  {/* <VaccineDates>
                    Date to be given: {dailyVaccination.date_to_be_given}
                  </VaccineDates> */}
                  <VaccineDates>
                    Date Administerd : {dailyVaccination.date_given}
                  </VaccineDates>
                </VaccineCenter>
              </VaccineLeft>
              <VaccineButton>
                <label>
                  {/* <span>Administered</span> */}
                  <Switch
                    onColor="#e06c47"
                    onChange={(e) => handleVaccineChange(dailyVaccination)}
                    checked={dailyVaccination.administered}
                  />
                </label>
              </VaccineButton>
            </VaccineCard>
          ))}
        </RightDiv>
      </TopComponent>
      <RecordSection>
        <Title> Medication Records</Title>
        <table>
          <tr>
            <TableHeader>s/n</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Mortality</TableHeader>
            <TableHeader>Symptoms Observed</TableHeader>
            <TableHeader>Medication Given</TableHeader>
          </tr>
          {medications.map((medication) => (
            <tr key={medication.id}>
              <TableData>{medications.indexOf(medication) + 1}</TableData>
              <TableData>{medication.date}</TableData>
              <TableData>{medication.mortality}</TableData>
              <TableData>{medication.symptom}</TableData>
              <TableData>{medication.medication}</TableData>
              <TableData>
                <StyledButton primary>
                  <Link to={`/edit-health-record/${flockId}/${medication.id}`}>
                    Edit
                  </Link>
                </StyledButton>
              </TableData>
              <TableData>
                <DeleteButton onClick={(e) => handleDelete(medication)}>
                  <Link>Delete</Link>
                </DeleteButton>
              </TableData>
            </tr>
          ))}
        </table>
      </RecordSection>
    </PageWrapper>
  );
};

export default Health;
