import { Chart, registerables } from "chart.js";
import { ReactChart } from "chartjs-react";

//register all necessary components
Chart.register(...registerables);

const ChartAll = ({ dataChart }) => {
  return (
    <>
      <ReactChart
        id="BarChartAll"
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
        height={400}
      />
    </>
  );
};

export default ChartAll;
