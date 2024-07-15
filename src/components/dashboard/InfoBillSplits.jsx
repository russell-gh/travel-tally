import { addDecimals } from "../../utils/utilsBudget";
import ControlsAddExpense from "./ControlsAddExpense";
import { getTotalSplitBills } from "../../utils/utilsSplitBills";
import PieChart from "./PieChart";
import { useMemo } from "react";

const InfoBillSplits = ({ splits, homeCurrencySymbol }) => {
  const totalPaidBack = getTotalSplitBills(splits, "paid");
  const totalUnpaid = getTotalSplitBills(splits, "unpaid");
  const totalSplitBill = addDecimals(totalPaidBack * 100 + totalUnpaid * 100);

  const pieChart = useMemo(() => {
    return <PieChart totalPaid={totalPaidBack} totalUnpaid={totalUnpaid} />;
  }, [totalPaidBack, totalUnpaid]);

  return (
    <>
      <div className="chart">{pieChart}</div>
      <div className="containerBottomRowGrid">
        <div className="numbersBillSplits">
          <p>Total amount: </p>
          <p className="bold">
            {homeCurrencySymbol}
            {totalSplitBill}
          </p>
          <p className="positive">Paid back: </p>
          <p className="bold positive">
            {homeCurrencySymbol}
            {totalPaidBack}
          </p>
          <p className="negative">Unpaid:</p>
          <p className="bold negative">
            {homeCurrencySymbol}
            {totalUnpaid}
          </p>
        </div>
        <ControlsAddExpense />
      </div>
    </>
  );
};
export default InfoBillSplits;
