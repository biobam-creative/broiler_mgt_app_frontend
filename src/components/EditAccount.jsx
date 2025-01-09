import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import config from "../config.json";
import httpServices from "../services/httpServices";

import {
  PageWrapper,
  FormBox,
  Title,
  StyledButton,
  SelectLabel,
  Select,
} from "./styledComponents";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { primaryColor } from "../constants";

const EditAccount = () => {
  const { recordId } = useParams();

  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [incomeExpenditure, setIncomeExpenditure] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState("");

  let [fianceRecord, setFinanceRecord] = useState({});

  const btnDisabled =
    date && amount && incomeExpenditure && description ? false : true;

  const accountTypeOptions = [
    { value: "", label: "Select Income or expenditure" },
    { value: "Income", label: "Income" },
    { value: "Expenditure", label: "Expenditure" },
  ];

  useEffect(() => {
    async function getFinanceRecord() {
      const result = await httpServices.header.get(
        `/finance/finance/${recordId}`
      );
      setFinanceRecord(result.data);
      setDate(result.data.date);
      setAmount(result.data.amount);
      setIncomeExpenditure(result.data.income_expenditure);
      setDescription(result.data.description);
      console.log(result);
    }

    getFinanceRecord();
    console.log(fianceRecord);
  }, [setFinanceRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("amount", amount);
    formData.append("income_expenditure", incomeExpenditure);
    formData.append("description", description);

    setLoading(true);
    const response = await httpServices.header.patch(
      config.apiUrl + `/finance/finance/${recordId}`,
      formData
    );
    if (response.status === 200) {
      setFinanceRecord(response.data);
      alert("Correction Effected");
    }
    setLoading(false);
  };
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <Loading color={primaryColor} type={"spin"} />;
  }

  return (
    <PageWrapper>
      <FormBox width="50vh">
        <Title>Edit Income/Expenditure Record</Title>
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
          {/* <InputField
            placeholder="Income or Expenditure"
            type="select"
            label="Income or Expenditure"
            id="income-expenditure"
            value={incomeExpenditure}
            handleChange={(e) => setIncomeExpenditure(e.target.value)} */}
          {/* /> */}
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
            Edit Account Record
          </StyledButton>
        </form>
      </FormBox>
    </PageWrapper>
  );
};

export default EditAccount;
