import { Chart, registerables } from "chart.js";
import { ReactChart } from "chartjs-react";

//register all necessary components
Chart.register(...registerables);

const ChartIncludingOwed = ({ dataChart }) => {
  return (
    <>
      <ReactChart
        id="BarChart"
        type="bar"
        data={{
          labels: dataChart[0],
          datasets: [
            {
              label: "spend",
              backgroundColor: "#D6EE7980",
              borderColor: "#D6EE79",
              borderWidth: 2,
              data: dataChart[1],
            },
            {
              label: "owed",
              backgroundColor: "#235b8980",
              borderColor: "#235b89",
              borderWidth: 2,
              data: dataChart[4],
            },
            {
              label: "left",
              backgroundColor: "#c2c2c280",
              borderColor: "#c2c2c2",
              borderWidth: 2,
              data: dataChart[2],
            },
            {
              label: "overspend",
              backgroundColor: "#99000080",
              borderColor: "#990000",
              borderWidth: 2,
              data: dataChart[3],
            },
          ],
        }}
        options={{
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
        }}
        height={300}
      />
    </>
  );
};

export default ChartIncludingOwed;
