import { PieChart } from "@mui/x-charts";
import { addDecimals } from "../../utils/utils";

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
            { id: 0, value: addDecimals(budgetFood), label: "Food" },
            {
              id: 1,
              value: addDecimals(budgetActivities),
              label: "Activities",
            },
            { id: 2, value: addDecimals(budgetHotel), label: "Hotel" },
            { id: 3, value: addDecimals(budgetTransport), label: "Transport" },
            { id: 4, value: addDecimals(budgetOther), label: "other" },
          ],
        },
      ]}
      width={500}
      height={150}
    />
  );
};

export default BudgetPieChart;
