// import React from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Box, Header } from "@adminjs/design-system";
// import { chartData, chartOptions } from "../custom-components/faker-bar-chart";
// import { CategoryScale, Chart } from "chart.js";
// import { CategoryScale, Bar } from "chart.js";
import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import { FunnelChart } from "react-funnel-pipeline";
import StatsBox from "../custom-components/stats-box";
import Card from "../custom-components/card-color";
import { faker } from "@faker-js/faker/locale/en_US";

// function setRandomBackgroundColor(card) {
//   const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
//   const randomColor = colors[Math.floor(Math.random() * colors.length)];
//   card.style.backgroundColor = randomColor;
// }

// To use the setRandomBackgroundColor function in a div where the value looks like bg=, you can do the following:

// function Card(props) {
//   return (
//     <div
//       className="card"
//       bg={() => setRandomBackgroundColor(this)}
//       ref={(card) => this.card = card}
//     >
//       {props.children}
//     </div>
//   );
// }
// https://react-chartjs-2.js.org/faq/registered-scale/

const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: 'top' as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// Chart.register(CategoryScale);

// export function App() {
//   return <Bar options={options} data={data} />;
// }

const Sandbox = () => {
  const [totalPosition, setTotalPosition] = useState(0);
  const [totalCandidate, setTotalCandidate] = useState(0);
  const [totalHired, setTotalHired] = useState(0);
  const [totalStreet, setTotalStreet] = useState(0);
  const [streetCountHasLength, setStreetCountHasLength] = useState(0);
  const [streetCountHasWidth, setStreetCountHasWidth] = useState(0);
  const [streetCountHasArea, setStreetCountHasArea] = useState(0);

  const [streetTotalLength, setStreetTotalLength] = useState(0);
  const [streetTotalWidth, setStreetTotalWidth] = useState(0);
  const [streetTotalArea, setStreetTotalArea] = useState(0);

  // const [streetByWidth, setStreetByWidth] = useState([]);
  // const [streetByWidthBucket, setStreetByWidthBucket ] = useState([]);

  const [positionsName, setPositionsName] = useState([]);
  const [nbCandidateByPosition, setNbCandidateByPosition] = useState([]);
  const [nbCandidateByStage, setNbCandidatByStage] = useState([]);
  const [loading, setLoading] = useState(true);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => getStats(), []);

  // console.log("nbCandidateByPosition ", nbCandidateByPosition);

  // console.log("nbCandidateByStage ", nbCandidateByStage);

  function getStats() {
    fetch(`/streetStats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((statsResp) => statsResp.json())
      .then((statsData) => {
        const { data } = statsData;
        const {
          candidateByPosition,
          candidateByStage,
          positionCount,
          candidateCount,
          hiredCount,
          streetCountHasLength,
          streetCountHasWidth,
          streetCountHasArea,
          streetCount,
          streetTotalLength,
          streetTotalWidth,
          streetTotalArea,
          // streetByWidth,
          // streetByWidthBucket,
        } = data;

        setTotalPosition(positionCount);
        setTotalCandidate(candidateCount);
        setTotalHired(hiredCount);
        setStreetCountHasLength(streetCountHasLength);
        setStreetCountHasWidth(streetCountHasWidth);
        setStreetCountHasArea(streetCountHasArea);
        setTotalStreet(streetCount);
        setStreetTotalLength(streetTotalLength);
        setStreetTotalWidth(streetTotalWidth);
        setStreetTotalArea(streetTotalArea);

        const positionsName = candidateByPosition.map(
          (item) => item.positionName
        );
        setPositionsName(positionsName);

        const nbCandidateByPosition = candidateByPosition.map(
          (item) => item.count
        );
        setNbCandidateByPosition(nbCandidateByPosition);

        let applications = 0,
          interviews = 0,
          offers = 0,
          hired = 0;
        for (let i = 0; i < candidateByStage.length; i = i + 1) {
          applications += candidateByStage[i].count;
          if (
            ["INTERVIEW", "INTERVIEW_REJECTED", "OFFER", "HIRED"].includes(
              candidateByStage[i]._id
            )
          ) {
            interviews += candidateByStage[i].count;
          }
          if (["OFFER", "HIRED"].includes(candidateByStage[i]._id)) {
            offers += candidateByStage[i].count;
          }
          if (["HIRED"].includes(candidateByStage[i]._id)) {
            hired += candidateByStage[i].count;
          }
        }
        const nbCandidateByStage = [
          {
            name: "Application",
            value: applications,
          },
          {
            name: "Interview",
            value: interviews,
          },
          {
            name: "Offer",
            value: offers,
          },
          {
            name: "Hired",
            value: hired,
          },
        ];

        setNbCandidatByStage(nbCandidateByStage);

        setLoading(false);
      });
  }

  const hiringFunnelChart = {
    data: nbCandidateByStage,
  };

  const appByPositionChart = {
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      barPercentage: 0.4,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
    data: {
      labels: positionsName,
      datasets: [
        {
          label: "Application",
          data: nbCandidateByPosition,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
      ],
    },
  };

  return !loading ? (
    <div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <StatsBox
          label="Open positions"
          data={totalPosition}
          link="/admin/resources/Position"
          icon="Archive"
          bg="#FF4567"
          color="#FFFFFF"
        ></StatsBox>

        <StatsBox
          label="Candidates"
          data={totalCandidate}
          link="/admin/resources/Candidate"
          icon="ContainerSoftware"
          bg="#F0BC13"
          color="#FFFFFF"
        ></StatsBox>

        <StatsBox
          label="StreetCount"
          data={totalStreet}
          link="/admin/resources/Candidate?filters.currentStage=HIRED"
          icon="Settings"
          bg="#70C9B0"
          color="#FFFFFF"
        ></StatsBox>
      </div>

      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <StatsBox
          label="Has Length"
          data={streetCountHasLength}
          link="/admin/resources/Street"
          icon="Archive"
          bg="#ce3551"
          color="#FFFFFF"
        ></StatsBox>

        <StatsBox
          label="Has Width"
          data={streetCountHasWidth}
          link="/admin/resources/Street"
          icon="ContainerSoftware"
          bg="#54c00b"
          color="#FFFFFF"
        ></StatsBox>

        <StatsBox
          label="Has Area"
          data={streetCountHasArea}
          link="/admin/resources/Street"
          icon="Settings"
          bg="#b9c970"
          color="#FFFFFF"
        ></StatsBox>

        <StatsBox
          label="Total Length"
          data={streetTotalLength}
          link="/admin/resources/Street"
          icon="Archive"
          bg="#ce3551"
          color="#FFFFFF"
        ></StatsBox>

        <StatsBox
          label="Total Width"
          data={streetTotalWidth}
          link="/admin/resources/Street"
          icon="ContainerSoftware"
          bg="#54c00b"
          color="#FFFFFF"
        ></StatsBox>

        <StatsBox
          label="Total Area"
          data={streetTotalArea}
          link="/admin/resources/Street"
          icon="Settings"
          bg="#b9c970"
          color="#FFFFFF"
        ></StatsBox>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <Box
          width={1 / 6}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Application by position4
          </Header.H4>
          {/* <Bar options={options} data={data} /> */}
          <Bar
            options={appByPositionChart.options}
            data={appByPositionChart.data}
          />
        </Box>

        <Box
          width={1 / 6}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Recruitment Funnel4
          </Header.H4>
          <FunnelChart
            style={{ width: "70%", margin: "auto" }}
            data={hiringFunnelChart.data}
          />
        </Box>
        <Box
          width={1 / 6}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Application by position5
          </Header.H4>
          {/* <Bar options={options} data={data} /> */}
          <Bar
            options={appByPositionChart.options}
            data={appByPositionChart.data}
          />
        </Box>

        <Box
          width={1 / 6}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Recruitment Funnel5
          </Header.H4>
          <FunnelChart
            style={{ width: "70%", margin: "auto" }}
            data={hiringFunnelChart.data}
          />
        </Box>
        <Box
          width={1 / 6}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Application by position6
          </Header.H4>
          {/* <Bar options={options} data={data} /> */}
          <Bar
            options={appByPositionChart.options}
            data={appByPositionChart.data}
          />
        </Box>

        <Box
          width={1 / 6}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Recruitment Funnel6
          </Header.H4>
          <FunnelChart
            style={{ width: "70%", margin: "auto" }}
            data={hiringFunnelChart.data}
          />
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <Box
          width={1 / 4}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Application by position2
          </Header.H4>
          {/* <Bar options={options} data={data} /> */}
          <Bar
            options={appByPositionChart.options}
            data={appByPositionChart.data}
          />
        </Box>

        <Box
          width={1 / 4}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Recruitment Funnel2
          </Header.H4>
          <FunnelChart
            style={{ width: "70%", margin: "auto" }}
            data={hiringFunnelChart.data}
          />
        </Box>
        <Box
          width={1 / 4}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Application by position3
          </Header.H4>
          {/* <Bar options={options} data={data} /> */}
          <Bar
            options={appByPositionChart.options}
            data={appByPositionChart.data}
          />
        </Box>

        <Box
          width={1 / 4}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Recruitment Funnel3
          </Header.H4>
          <FunnelChart
            style={{ width: "70%", margin: "auto" }}
            data={hiringFunnelChart.data}
          />
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <Box
          width={1 / 2}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Application by position
          </Header.H4>
          {/* <Bar options={options} data={data} /> */}
          <Bar
            options={appByPositionChart.options}
            data={appByPositionChart.data}
          />
        </Box>

        <Box
          width={1 / 2}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Recruitment Funnel
          </Header.H4>
          <FunnelChart
            style={{ width: "70%", margin: "auto" }}
            data={hiringFunnelChart.data}
          />
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <Box
          width={1 / 2}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Bar Chart with Random Data
          </Header.H4>
          <Bar options={options} data={data} />
          {/* <Bar
            options={appByPositionChart.options}
            data={appByPositionChart.data}
          /> */}
        </Box>

        <Box
          width={1 / 2}
          variant="card"
          style={{ textAlign: "center", margin: "10px", padding: "18px" }}
        >
          <Header.H4
            style={{
              fontWeight: "400",
              marginTop: "0px",
              marginBottom: "40px",
            }}
          >
            Another Recruitment Funnel
          </Header.H4>
          <FunnelChart
            style={{ width: "70%", margin: "auto" }}
            data={hiringFunnelChart.data}
          />
        </Box>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Sandbox;
