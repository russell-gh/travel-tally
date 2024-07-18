import { Chart, registerables } from "chart.js";
import { ReactChart } from "chartjs-react";

//register all necessary components
Chart.register(...registerables);

const PieChart = ({ totalUnpaid, totalPaid }) => {
  return (
    <>
      <ReactChart
        id="PieChart"
        type="doughnut"
        data={{
          labels: ["Paid", "Unpaid"],
          datasets: [
            {
              label: "SplitBills",
              data: [totalPaid, totalUnpaid],
              backgroundColor: ["#D6EE7980", "#99000080"],
              borderColor: ["#D6EE79", "#990000"],
              borderWidth: 2,
            },
          ],
        }}
        options={{}}
        height={300}
      />
    </>
  );
};

export default PieChart;
