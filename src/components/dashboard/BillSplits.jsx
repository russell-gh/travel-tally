import BillSplitItems from "./BillSplitItems";
import { useSelector } from "react-redux";
import { selectCurrencyCodes } from "../../redux/homeSlice";

const BillSplits = ({ splits, homeCurrencySymbol, expenses, filtered }) => {
  const currencyCodes = useSelector(selectCurrencyCodes);

  if (splits.length === 0) {
    return <Message message="You have no splits yet." className="message" />;
  }

  // if (filtered.length === 0) {
  //   return <Message message="There are no matches" className="message" />;
  // }

  return (
    <div className="billSplits">
      <BillSplitItems
        splits={splits}
        homeCurrencySymbol={homeCurrencySymbol}
        currencyCodes={currencyCodes}
        expenses={expenses}
        filtered={filtered}
      />
    </div>
  );
};

export default BillSplits;
