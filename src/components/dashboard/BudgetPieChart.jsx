import { PieChart } from "@mui/x-charts";

const BudgetPieChart = ({ details }) => {
  const {
    budgetActivities,
    budgetHotel,
    budgetOther,
    budgetTransport,
    budgetFood,
  } = details;
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: budgetFood, label: "Food" },
            { id: 1, value: budgetActivities, label: "Activities" },
            { id: 2, value: budgetHotel, label: "Hotel" },
            { id: 3, value: budgetTransport, label: "Transport" },
            { id: 4, value: budgetOther, label: "other" },
          ],
        },
      ]}
      width={500}
      height={150}
    />
  );
};

export default BudgetPieChart;
