import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpServices from "../services/httpServices";
import config from "../config.json";
import Switch from "react-switch";
import {
  Detailscontainer,
  PageWrapper,
  Title,
  DetailsTitle,
  DetailsParam,
  DetailsRow,
  AddButton,
} from "./styledComponents";
import { FaPen } from "react-icons/fa6";
import { primaryColor, secondaryColor } from "../constants";
import Loading from "./Loading";
import { differenceInDays } from "date-fns";

const FlockDetails = () => {
  // console.log(new Date());
  const { flockId } = useParams();
  const [flockDetails, setFlockDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getFlockDetails() {
      setLoading(true);
      try {
        const result = await httpServices.header.get(
          `/records/flock/${flockId}`
        );
        if (result.status === 200) {
          setFlockDetails(result.data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            navigate("/login", { replace: true });
          }
        } else {
          Swal.fire({
            title: "Error",
            text: "A network error occured, please check your internet connection",
            icon: "info",
          });
        }
      } finally {
        setLoading(false);
      }
    }
    getFlockDetails();
  }, [setFlockDetails]);
  const handleSodOutChange = async (details) => {
    const data = {
      sold_out: !details.sold_out,
    };
    console.log(data);

    const response = await httpServices.header.patch(
      config.apiUrl + `/records/flock/${flockId}`,
      data
    );
    if (response.status === 200) {
      flockDetails.sold_out = data.sold_out;
      setFlockDetails(response.data);
    }
  };

  if (loading) {
    return <Loading color={primaryColor} type="spin" />;
  }
  return (
    <PageWrapper>
      <Detailscontainer>
        <Title> Flock Details</Title>
        <DetailsRow>
          <DetailsTitle>Label:</DetailsTitle>
          <DetailsParam>{flockDetails.label}</DetailsParam>
        </DetailsRow>
        <DetailsRow>
          <DetailsTitle>Breed:</DetailsTitle>
          <DetailsParam>{flockDetails.breed}</DetailsParam>
        </DetailsRow>
        <DetailsRow>
          <DetailsTitle>Arrival Date:</DetailsTitle>
          <DetailsParam>{flockDetails.arrival_date}</DetailsParam>
        </DetailsRow>
        <DetailsRow>
          <DetailsTitle>Population:</DetailsTitle>
          <DetailsParam>{flockDetails.number}</DetailsParam>
        </DetailsRow>
        <DetailsRow>
          <DetailsTitle>Age:</DetailsTitle>
          <DetailsParam>
            {differenceInDays(new Date(), new Date(flockDetails.arrival_date)) +
              flockDetails.age_of_chicks}{" "}
            days
          </DetailsParam>
        </DetailsRow>
        <DetailsRow>
          <DetailsTitle>Weight:</DetailsTitle>
          <DetailsParam>{flockDetails.average_weight}</DetailsParam>
        </DetailsRow>
        <DetailsRow>
          <DetailsTitle>Sold/Slaughtered:</DetailsTitle>
          <DetailsParam>
            {" "}
            <label>
              {/* <span>Administered</span> */}
              <Switch
                onColor="#e06c47"
                onChange={(e) => {
                  handleSodOutChange(flockDetails);
                }}
                checked={flockDetails.sold_out}
              />
            </label>
            {flockDetails.sold_out}
          </DetailsParam>
        </DetailsRow>
        <AddButton
          onClick={() => navigate(`/edit-Flock/${flockId}`, { replace: true })}
          background={secondaryColor}
        >
          <FaPen /> Edit
        </AddButton>
      </Detailscontainer>
    </PageWrapper>
  );
};

export default FlockDetails;
