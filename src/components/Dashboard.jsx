import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import httpServices from "../services/httpServices";
import config from "../config.json";
import {
  FaFileDownload,
  FaPlus,
  FaBookOpen,
  FaHeartbeat,
  FaChartLine,
  FaTrash,
} from "react-icons/fa";
import { GiWeight, GiTakeMyMoney, GiPowderBag } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { primaryColor, secondaryColor } from "../constants";
import {
  Title,
  FlockSection,
  FlockList,
  FlockCard,
  FlockTitleAndButton,
  AddButton,
  FilterGroup,
  FilterButton,
  QuickLinkSection,
  LinkGroup,
} from "./styledComponents";
import QuickLink from "./QuickLink";
import Swal from "sweetalert2";
import Loading from "./Loading";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  // overflow: hidden;
`;

const SidebarContainer = styled.div`
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background-color: rgb(135, 165, 54);
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
`;
const Logo = styled.div`
  padding: 20px;
`;
const PageWrapper = styled.div`
  margin: 0.5rem;
  display: flex;
  top: 0;
  height: 100vh;
  width: 100%;
  flex-direction: column;
`;
const StatSection = styled.div`
  display: flex;
  // justify-content: space-between;
  padding: 0.2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const WelcomeSection = styled.div`
  color: "#87a536";
  font: "lato";
  font-weight: "500";
  font-size: "1rem";
  margin: "1rem";
  margin-bottom: "3rem";
`;

const Name = styled.span`
  font-weight: 700;
  font-size: 1.3rem;
`;

const StatCard = styled.div`
  color: white;
  margin: 0.3rem;
  min-height: 8rem;
  min-width: 14rem;
  border-radius: 20px;
  position: relative;

  ${(props) =>
    props.background
      ? `background-color: ${props.background}; color: #fff;`
      : `background-color: #fff; border: 3px solid #87a536; color: #87a536;`};
  @media (max-width: 768px) {
    min-height: 5rem;
  }
`;
const StatTitle = styled.h3`
  font-weight: 500;
  margin: 0.7rem;
  font: lato;
`;

const StatNumber = styled.h2`
  font-weight: 700;
  font-size: 1.6rem;
  margin: 0.7rem;
  font: lato;
  right: 0;
  position: absolute;
  bottom: 0;
`;
const MainSection = styled.div`
  display: flex;
  margin-top: 1rem;
  overflow: hidden;
  @media (max-width: 820px) {
    flex-direction: column;
    // width: 80vw;
    margin: 0.5rem;
    overflow: visible;
  }
`;

const FlockName = styled.p`
  color: #87a536;
  font-weight: 600;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const SecondaryInfo = styled.div`
  margin-left: 0.5rem;
  display: flex;
  font-size: 0.8rem;
`;

const FlockInfo = styled.div``;

const FlockPopulation = styled.p`
  margin: 0;
  color: green;
`;

const IconGroup = styled.div`
  display: flex;
  margin: 0.8rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 820px) {
    // flex-direction: column;
    // width: 100vw;
    // padding: 1rem;
  }
`;

const CardLinkText = styled.div`
  font-size: 0.7rem;
`;

const FlockStatus = styled.p`
  margin: 0;
  margin-left: 0.3rem;
  ${(props) => (props.sold ? `color:#e06c47;` : `color:#87a536;`)}
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #87a536;
  padding: 0.5rem;
  margin: 0.2rem;
  border-radius: 5px;
  align-items: center;
`;

const FlockDelete = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #87a536;
  padding: 0.5rem;
  margin: 0.2rem;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;
`;

const Dashboard = () => {
  const [flocks, setFlocks] = useState([]);

  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const filteredFlocks = flocks.filter((flock) => {
    if (filter === "all") return true;
    if (filter === "active") return !flock.sold_out;
    if (filter === "sold") return flock.sold_out;
  });

  const totalBirds = flocks.reduce(
    (accumulator, currentValue) => accumulator + currentValue.number,
    0
  );

  const handleAddFlock = () => {
    navigate("/add-flock", { replace: true });
  };

  const handleFilterClick = (button) => {
    setFilter(button);
  };
  const handleDelete = async (flock) => {
    setLoading(true);
    const index = flocks.indexOf(flock);
    try {
      const response = await httpServices.header.delete(
        config.apiUrl + `/records/flock/${flock.id}`
      );
      if (response.status === 200) {
        setFlocks(response.data);
        Swal.fire({
          title: "Deleted",
          text: "Flock deleted successfully",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          Swal.fire({
            title: "Error",
            text: "Your session has expired please login again",
            icon: "info",
          });
          navigate("/login", { replace: true });
        } else if (error.response.status === 403) {
          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "info",
          });
        } else if (error.response.status === 404) {
          Swal.fire({
            title: "Error",
            text: "Not found",
            icon: "info",
          });
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
  };

  useEffect(() => {
    async function getFlocks() {
      const result = await httpServices.header.get(`/records/flock`);
      setFlocks(result.data);
    }

    getFlocks();
  }, [setFlocks]);
  const accessToken = localStorage.getItem("access_token");
  const farm = localStorage.getItem("farm_name");
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <Loading type={"spin"} color={primaryColor} />;
  }
  return (
    <DashboardContainer>
      {/* <SidebarContainer>
        <Logo>
          <img src="" />
        </Logo>
      </SidebarContainer> */}
      <PageWrapper>
        <WelcomeSection>
          {" "}
          Welcome, <Name>{farm}</Name>
        </WelcomeSection>
        <StatSection>
          <StatCard background={primaryColor}>
            <StatTitle>Active Flocks</StatTitle>
            <StatNumber>{flocks.length} Flocks</StatNumber>
          </StatCard>
          <StatCard background={primaryColor}>
            <StatTitle>Total Birds</StatTitle>
            <StatNumber>{totalBirds.toLocaleString()} Birds</StatNumber>
          </StatCard>
          <StatCard background={primaryColor}>
            <StatTitle>Available Feed</StatTitle>
            <StatNumber>100,000 KG</StatNumber>
          </StatCard>
        </StatSection>
        <MainSection>
          <FlockSection>
            <FlockTitleAndButton>
              <Title>Flocks</Title>
              <AddButton onClick={handleAddFlock} background={primaryColor}>
                {" "}
                <FaPlus />
                {"  "}
                Add Flock
              </AddButton>
            </FlockTitleAndButton>
            <FilterGroup>
              <FilterButton
                isSelected={filter === "all"}
                onClick={() => handleFilterClick("all")}
              >
                All
              </FilterButton>
              <FilterButton
                isSelected={filter === "active"}
                onClick={() => handleFilterClick("active")}
              >
                Active
              </FilterButton>
              <FilterButton
                isSelected={filter === "sold"}
                onClick={() => handleFilterClick("sold")}
              >
                Sold
              </FilterButton>
            </FilterGroup>
            <FlockList>
              {filteredFlocks.map((flock) => (
                <FlockCard key={flock.id}>
                  <FlockInfo>
                    <FlockName>{flock.label}</FlockName>
                    <SecondaryInfo>
                      <FlockPopulation>
                        {flock.number + " "}Birds
                      </FlockPopulation>
                      <FlockStatus sold={flock.sold_out}>
                        {flock.sold_out ? "Sold" : "Active"}
                      </FlockStatus>
                    </SecondaryInfo>
                  </FlockInfo>
                  <IconGroup>
                    <CardLink to={`/add-weight-record/${flock.id}`}>
                      <GiWeight />
                      <CardLinkText>Weight</CardLinkText>
                    </CardLink>
                    <CardLink to={`/feed/${flock.id}`}>
                      <GiPowderBag />
                      <CardLinkText>Feed</CardLinkText>
                    </CardLink>
                    <CardLink to={`/health/${flock.id}`}>
                      <FaHeartbeat />
                      <CardLinkText>Health</CardLinkText>
                    </CardLink>
                    <CardLink to={`/flock-details/${flock.id}`}>
                      <FaBookOpen />
                      <CardLinkText>Details</CardLinkText>
                    </CardLink>
                    <FlockDelete onClick={(e) => handleDelete(flock)}>
                      <FaTrash />
                      <CardLinkText>Delete</CardLinkText>
                    </FlockDelete>
                  </IconGroup>
                </FlockCard>
              ))}
            </FlockList>
          </FlockSection>
          <QuickLinkSection>
            <Title>Quick Links</Title>
            <LinkGroup>
              <QuickLink
                link="/account"
                icon={<FaMoneyBillTransfer size={28} />}
                text="Account records"
              />
              <QuickLink
                link="/document"
                icon={<FaFileDownload size={28} />}
                text="Download Records"
              />
            </LinkGroup>
          </QuickLinkSection>
        </MainSection>
      </PageWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
