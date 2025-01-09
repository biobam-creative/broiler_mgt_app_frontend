import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";
import { cobb500, ross308 } from "../performanceobjectives";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

import {
  CompareButton,
  StyledButton,
  DeleteButton,
  PageWrapper,
  FormBox,
  RecordSection,
  ChartSection,
  Title,
  TableData,
  TableHeader,
  TopComponent,
} from "./styledComponents";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { primaryColor } from "../constants";

const AddWeightRecord = () => {
  const { flockId } = useParams();

  const [date, setDate] = useState(null);
  const [number, setNumber] = useState(0);
  const [averageWeight, setAverageWeight] = useState(0);

  const [loading, setLoading] = useState(false);

  let [weightRecords, setWeightRecords] = useState([]);

  const [compareWeight, setCompareWeight] = useState(false);

  const navigate = useNavigate();

  const btnDisabled = date && number && averageWeight ? false : true;

  useEffect(() => {
    async function getWeightRecords() {
      const result = await httpServices.header.get(
        `/records/weight/${flockId}`
      );
      setWeightRecords(result.data);
    }

    getWeightRecords();
  }, [setWeightRecords]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("flock_id", flockId);
    formData.append("date", date);
    formData.append("number_of_birds", number);
    formData.append("average_weight", averageWeight);

    console.log(formData);

    setLoading(true);
    const response = await httpServices.header.post(
      config.apiUrl + `/records/weight/${flockId}`,
      formData
    );
    if (response.status === 200) {
      setWeightRecords(response.data);
      alert("Weight Added Successfully");
    }
    setLoading(false);
  };

  const handleDelete = async (weightRecord) => {
    setLoading(true);
    const index = weightRecords.indexOf(weightRecord);
    const response = await httpServices.header.delete(
      config.apiUrl + `/records/weight_details/${flockId}/${weightRecord.id}`
    );
    if (response.status === 200) {
      setWeightRecords(response.data);
      alert("Entry Deleted");
    }
    setLoading(false);
  };
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <Loading type="spinner" color={primaryColor} />;
  }
  return (
    <PageWrapper>
      <TopComponent>
        <FormBox width="50vh" marginTop="1rem">
          <Title>Add Weight Record</Title>
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
              Add Weight Record
            </StyledButton>
          </form>
        </FormBox>
        <ChartSection>
          <Title> Chart</Title>

          {/* <InputField type="button" label="compare" value={compareWeight}>
            compare{" "}
          </InputField> */}
          <ResponsiveContainer>
            <LineChart>
              <CartesianGrid />
              <XAxis dataKey="age" interval={"preserveStartEnd"} />
              <YAxis></YAxis>
              <Legend />
              <Tooltip />
              <Line
                data={weightRecords}
                dataKey="average_weight"
                stroke="#87a536"
                dot={false}
                activeDot={{ r: 8 }}
              />
              {compareWeight ? (
                <Line
                  data={ross308.slice(0, weightRecords.length)}
                  dataKey="weight"
                  stroke="red"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              ) : null}
              {/* //   data={cobb500.slice(0, weightRecords.length)}
              //   dataKey="weight"
              //   stroke="blue"
              //   activeDot={{ r: 8 }}
              //   dot={false}
              // />) : null } */}
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>
      </TopComponent>
      <RecordSection>
        <Title> Weight Records</Title>
        <table>
          <tr>
            <TableHeader>s/n</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Average Weight</TableHeader>
            <TableHeader>Number of Birds Sampled</TableHeader>
          </tr>
          {weightRecords.map((weightRecord) => (
            <tr key={weightRecord.id}>
              <TableData>{weightRecords.indexOf(weightRecord) + 1}</TableData>
              <TableData>{weightRecord.date_taken}</TableData>
              <TableData>{weightRecord.average_weight}</TableData>
              <TableData>{weightRecord.number_of_birds}</TableData>
              <TableData>
                <StyledButton primary>
                  <Link
                    to={`/edit-weight-record/${flockId}/${weightRecord.id}`}
                  >
                    Edit
                  </Link>
                </StyledButton>
              </TableData>
              <TableData>
                <DeleteButton onClick={(e) => handleDelete(weightRecord)}>
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

export default AddWeightRecord;
