import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
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
  Select,
  SelectLabel,
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
import Loading from "./Loading";
import { primaryColor, secondaryColor } from "../constants";

const Account = () => {
  const { farmId } = useParams();

  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [incomeExpenditure, setIncomeExpenditure] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState("");

  let [fianceRecords, setFinanceRecords] = useState([]);

  const btnDisabled =
    date && amount && incomeExpenditure && description ? false : true;

  const accountTypeOptions = [
    { value: "", label: "Select Income or expenditure" },
    { value: "Income", label: "Income" },
    { value: "Expenditure", label: "Expenditure" },
  ];

  useEffect(() => {
    async function getFinanceRecords() {
      const result = await httpServices.header.get(`/finance/finance`);
      setFinanceRecords(result.data);
    }

    getFinanceRecords();
  }, [setFinanceRecords]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("farm_id", farmId);
    formData.append("date", date);
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("income-expenditure", incomeExpenditure);

    console.log(formData);

    setLoading(true);
    const response = await httpServices.header.post(
      config.apiUrl + `/finance/finance`,
      formData
    );
    if (response.status === 200) {
      setFinanceRecords(response.data);
      alert("Record Added Successfully");
    }
    setLoading(false);
  };

  const handleDelete = async (financeRecord) => {
    setLoading(true);
    // const index = weightRecords.indexOf(weightRecord);
    const response = await httpServices.header.delete(
      config.apiUrl + `/finance/finance/${financeRecord.id}`
    );
    if (response.status === 200) {
      // const newWeightRecords = weightRecords.splice(index, 1);
      setFinanceRecords(response.data);
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
    return <Loading type={"spin"} color={primaryColor} />;
  }

  return (
    <PageWrapper>
      <TopComponent>
        <FormBox margin-top="0px" width="50vh">
          <Title>Add Income/Expenditure Record</Title>
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
              placeholder="Amount"
              type="number"
              label="Amount"
              id="amount"
              value={amount}
              handleChange={(e) => setAmount(e.target.value)}
            />
            <InputField
              placeholder="Description"
              type="text"
              label="Description"
              id="description"
              value={description}
              handleChange={(e) => setDescription(e.target.value)}
            />
            <SelectLabel htmlFor="income-expenditure">
              choose Income or Expenditure
            </SelectLabel>
            <Select
              id="income-expenditure"
              value={incomeExpenditure}
              onChange={(e) => setIncomeExpenditure(e.target.value)}
            >
              {accountTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <StyledButton disabled={btnDisabled} primary>
              Add Account Record
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
              <XAxis dataKey="date" interval={"preserveStartEnd"} />
              <YAxis></YAxis>
              <Legend />
              <Tooltip />
              <Line
                data={fianceRecords.filter((item) => {
                  return item.income_expenditure === "Income";
                })}
                dataKey={"amount"}
                stroke={primaryColor}
                dot={false}
                activeDot={{ r: 8 }}
              />
              <Line
                data={fianceRecords.filter((item) => {
                  return item.income_expenditure === "Expenditure";
                })}
                dataKey="amount"
                stroke={secondaryColor}
                dot={false}
                activeDot={{ r: 8 }}
              />
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
        <Title> Financial Records</Title>
        <table>
          <tr>
            <TableHeader>s/n</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Income/Expenditure</TableHeader>
            <TableHeader>Description</TableHeader>
          </tr>
          {fianceRecords.map((financeRecord) => (
            <tr key={financeRecord.id}>
              <TableData>{fianceRecords.indexOf(financeRecord) + 1}</TableData>
              <TableData>{financeRecord.date}</TableData>
              <TableData>{financeRecord.amount}</TableData>
              <TableData>{financeRecord.income_expenditure}</TableData>
              <TableData>{financeRecord.description}</TableData>
              <TableData>
                <StyledButton primary>
                  <Link to={`/edit-account/${financeRecord.id}`}>Edit</Link>
                </StyledButton>
              </TableData>
              <TableData>
                <DeleteButton onClick={(e) => handleDelete(financeRecord)}>
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

export default Account;
