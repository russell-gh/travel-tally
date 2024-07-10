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
              backgroundColor: "#D6EE79",
              data: dataChart[1],
            },
            {
              label: "left",
              backgroundColor: "lightgrey",
              data: dataChart[2],
            },
            {
              label: "overspend",
              backgroundColor: "darkred",
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
