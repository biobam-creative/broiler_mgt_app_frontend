import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";

import { ross308, cobb500 } from "../performanceobjectives";

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

const Feed = () => {
  const { flockId } = useParams();

  const [date, setDate] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState("");

  const [loading, setLoading] = useState(false);

  let [feedingRecords, setFeedingRecords] = useState([]);

  const btnDisabled = date && type && quantity ? false : true;

  useEffect(() => {
    async function getFeedingRecords() {
      const result = await httpServices.header.get(
        `/records/feeding/${flockId}`
      );
      setFeedingRecords(result.data);
    }

    getFeedingRecords();
  }, [setFeedingRecords]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("flock_id", flockId);
    formData.append("date", date);
    formData.append("type_of_feed_given", type);
    formData.append("quantity", quantity);

    console.log(formData);

    setLoading(true);
    const response = await httpServices.header.post(
      config.apiUrl + `/records/feeding/${flockId}`,
      formData
    );
    if (response.status === 200) {
      setFeedingRecords(response.data);
      alert("Feeding Record Added Successfully");
    }
    setLoading(false);
  };

  const handleDelete = async (feedingRecord) => {
    setLoading(true);
    const index = feedingRecords.indexOf(feedingRecord);
    const response = await httpServices.header.delete(
      config.apiUrl + `/records/feeding_details/${flockId}/${feedingRecord.id}`
    );
    if (response.status === 200) {
      setFeedingRecords(response.data);
      console.log(response.data);
      alert("Entry Deleted");
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
      <TopComponent>
        <FormBox width="50vh">
          <Title>Add Feeding Record</Title>
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
              placeholder="Type of Feed"
              type="text"
              label="Type of Feed"
              id="type-of-feed"
              value={type}
              handleChange={(e) => setType(e.target.value)}
            />
            <InputField
              placeholder="Quantity of feed"
              type="number"
              label="Quantity of feed"
              id="quantity-of-feed"
              value={quantity}
              handleChange={(e) => setQuantity(e.target.value)}
            />

            <StyledButton disabled={btnDisabled} primary>
              Add Feeding Record
            </StyledButton>
          </form>
        </FormBox>
        <ChartSection>
          <Title> Chart</Title>
          <ResponsiveContainer>
            <LineChart data={feedingRecords}>
              <CartesianGrid />
              <XAxis dataKey="date" interval={"preserveStartEnd"} />
              <YAxis></YAxis>
              <Legend />
              <Tooltip />
              <Line
                dataKey="quantity"
                stroke="#87a536"
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>
      </TopComponent>
      <RecordSection>
        <Title> feeding Records</Title>
        <table>
          <tr>
            <TableHeader>s/n</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Quantity</TableHeader>
          </tr>
          {feedingRecords.map((feedingRecord) => (
            <tr key={feedingRecord.id}>
              <TableData>{feedingRecords.indexOf(feedingRecord) + 1}</TableData>
              <TableData>{feedingRecord.date}</TableData>
              <TableData>{feedingRecord.type_of_feed_given}</TableData>
              <TableData>{feedingRecord.quantity}</TableData>
              <TableData>
                <StyledButton primary>
                  <Link to={`/edit-feed-record/${flockId}/${feedingRecord.id}`}>
                    Edit
                  </Link>
                </StyledButton>
              </TableData>
              <TableData>
                <DeleteButton onClick={(e) => handleDelete(feedingRecord)}>
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

export default Feed;
