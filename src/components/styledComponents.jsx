import React from "react";
import styled from "styled-components";

import { primaryColor } from "../constants";

const StyledButton = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-right: 0.5rem;
  width: 100%;

  ${(props) =>
    props.primary
      ? `background-color: #E06C47; color: #fff;`
      : `background-color: #fff; border: 1px solid #E06C47; color: #E06C47;`}
  ${(props) =>
    props.disabled ? `background-color: rgba(0,0,0,0.1); color: grey;` : ``}

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-right: 0.5rem;
  background-color: red;

  &:hover {
    opacity: 0.8;
  }
`;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // padding: 0.5rem;
  @media (max-width: 820px) {
    justify-content: center;
    align-items: center;
  }
`;

const FormBox = styled.div`
  padding: 1.2rem;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "3rem")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: ${(props) => props.width};
  border-radius: 10px;
  height: ${(props) => props.height};
  background-color: white;

  @media (max-width: 360px) {
    width: 80%;
    // margin-left: 3rem;
    // margin-right: 3rem;
  }
`;

const RecordSection = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 95vw;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;

  padding: 0.5rem;
  margin-right: 0.5rem;
  height: 50vh;
  overflow-y: auto;
`;

const ChartSection = styled.div`
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  min-width: 50vw;
  margin-left: 1rem;
  border-radius: 10px;
  height: 50vh;
  background-color: white;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 0.5rem;
  }
`;

const RightDiv = styled.div`
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 50vw;
  margin-left: 1rem;
  border-radius: 10px;
  height: 50vh;
  background-color: white;
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 0.5rem;
  }
`;

const QuickLinkSection = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 50%;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  padding: 0.5rem;
  margin-left: 1rem;
  @media (max-width: 820px) {
    width: 90vw;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: left;
`;

const Title = styled.h1`
  color: #87a536;
  font-size: 1.3rem;
`;

const TableData = styled.td`
  padding: 0.3rem;
`;

const TableHeader = styled.th`
  padding: "290px";
`;

const TopComponent = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 80vw;
    margin: 0.5rem;
  }
`;

const FlockList = styled.div`
  overflow-y: auto;
  // width: 100%;
  @media (max-width: 820px) {
    // padding: 1rem;
`;

const FlockSection = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 0.6rem;
  padding-right: 0.9rem
  // margin: 0.5rem;
  height: 100%;
  width: 50%;
  overflow-x: hidden;
  @media (max-width: 820px) {
    // flex-direction: column;
    border-radius: 20px;
    width: 90vw;
    padding: 1rem;
  }
`;

const Warning = styled.p`
  background: yellow;
  color: red;
  min-height: 35px;
  width: 96%;
  padding: 0.5rem;
  border-radius: 8px;
`;

const VaccineCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  width: 100%;
  margin: 0.1rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;

  ${(props) =>
    props.given
      ? `background-color: #87a536; color: #fff;`
      : `background-color: #fff; color: #87a536;`};
`;
const VaccineCenter = styled.div`
  display: flex;
  margin-left: 0.9rem;
  flex-direction: column;
`;

const VaccineName = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
`;

const VaccineDates = styled.div`
  display: flex;
  font-size: 12px;
  margin-bottom: 0.2rem;
`;

const VaccineLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const VaccineAge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #87a536;
  min-width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1rem;
`;

const VaccineButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const CompareButton = styled.span`
  height: 50px;
  cursor: pointer;
  background-color: #87a536;
`;

const FlockTitleAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
  position: sticky;
  @media (max-width: 820px) {
    width: 90vw;
  }
`;

const AddButton = styled.button`
  text-align: center;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  height: 30px;
  ${(props) =>
    props.background
      ? `background-color: ${props.background}; color: #fff;`
      : `background-color: #87a536; color: #fff;`};
`;

const FlockCard = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 80px;
  border-top: 1px solid #87a536;
  border-bottom: 1px solid #87a536;
  @media (max-width: 820px) {
    width: 90vw;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
  margin-top: 0.4rem;
  @media (max-width: 820px) {
    width: 90vw;
  }
`;

const FilterButton = styled.button`
  border-radius: 50px;
  height: 30px;
  margin-right: 0.4rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  cursor: pointer;
  ${(props) =>
    props.isSelected
      ? `background-color: #87a536 ; border: none; color: #fff;`
      : `border: 2px solid #87a536; color: #87a536;`};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  // background-color: white;
  // opacity: 0.5;
`;

const Detailscontainer = styled.div`
  background-color: #fff;
  min-height: 100vh;
  width: 95vw;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
`;

const DetailsTitle = styled.div`
  font-size: 1rem;
  margin-right: 10rem;
  margin-bottom: 0.2rem;
`;

const DetailsParam = styled.div`
  color: #87a536;
  font-size: 1rem;
  font-weight: bold;
`;

const DetailsRow = styled.div`
  // border-bottom: 1px solid;
  width: 100vw;
  height: 3rem;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  color: #87a536;
  margin: 0.5rem;
  border-bottom: 2px solid #87a536;
  border: none;

  &:focus {
    outline: none;
    background-color: #fff;
    border-bottom: 2px solid #87a536;
    opacity: 1;
  }
`;
const SelectLabel = styled.label`
  color: #87a536;
  weight: w500;
  margin-left: 0.5rem;
`;

export {
  SelectLabel,
  Select,
  DetailsRow,
  DetailsParam,
  DetailsTitle,
  Detailscontainer,
  LoadingContainer,
  FlockList,
  QuickLinkSection,
  FilterButton,
  FilterGroup,
  FlockCard,
  AddButton,
  CompareButton,
  TableData,
  TableHeader,
  LinkGroup,
  TopComponent,
  StyledButton,
  DeleteButton,
  PageWrapper,
  FormBox,
  RecordSection,
  ChartSection,
  Title,
  RightDiv,
  VaccineCard,
  VaccineName,
  VaccineButton,
  VaccineAge,
  VaccineCenter,
  VaccineDates,
  VaccineLeft,
  Warning,
  FlockTitleAndButton,
  FlockSection,
};
