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
// import { CategoryScale, Chart } from "chart.js";
// import { CategoryScale, Bar } from "chart.js";
import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
import { FunnelChart } from "react-funnel-pipeline";
import StatsBox from "../custom-components/stats-box";
// import { faker } from "faker";
import { faker } from "@faker-js/faker/locale/en_US";

// https://react-chartjs-2.js.org/faq/registered-scale/

// Chart.register(CategoryScale);

// export function App() {
//   return <Bar options={options} data={data} />;
// }

const Sandbox = () => {
  const [totalPosition, setTotalPosition] = useState(0);
  const [totalCandidate, setTotalCandidate] = useState(0);
  const [totalHired, setTotalHired] = useState(0);
  const [totalStreet, setTotalStreet] = useState(0);
  // const [totalStreet, setTotalStreet] = useState(0);
  // const [totalStreet, setTotalStreet] = useState(0);
  // streetByWidth,
  // streetByWidthBucket,

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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

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

  useEffect(() => getStats(), []);

  console.log("nbCandidateByPosition ", nbCandidateByPosition);

  console.log("nbCandidateByStage ", nbCandidateByStage);

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
          streetCount,
          // streetByWidth,
          // streetByWidthBucket,
        } = data;

        setTotalPosition(positionCount);
        setTotalCandidate(candidateCount);
        setTotalHired(hiredCount);
        setTotalStreet(streetCount);

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
          <Bar options={options} data={data} />
          <Bar
            options={appByPositionChart.options}
            data={appByPositionChart.data}
          />
          {/* <FunnelChart
            style={{ width: "70%", margin: "auto" }}
            data={hiringFunnelChart.data}
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
            Recruitment Funnel
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
