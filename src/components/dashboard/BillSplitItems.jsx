import { unixToDate } from "../../utils/utilsDates";
import {
  addDecimals,
  getCurrencySymbol,
  nFormatter,
} from "../../utils/utilsBudget";
import FormElement from "../../reusable-code/FormElement";
import { useDispatch, useSelector } from "react-redux";
import { selectHidePaidSplitBills, setPaid } from "../../redux/homeSlice";
import { motion, AnimatePresence } from "framer-motion";

const BillSplitItems = ({
  splits,
  expenseId,
  homeCurrencySymbol,
  currencyCodes,
  expenses,
  tabBillSplit,
}) => {
  const dispatch = useDispatch();
  const hidePaidSplits = useSelector(selectHidePaidSplitBills);
  let arrayOfSplits = splits;

  if (!expenses) {
    return;
  }

  if (expenseId) {
    arrayOfSplits = splits.filter((split) => {
      return split.expenseId === expenseId;
    });
  }

  if (hidePaidSplits) {
    arrayOfSplits = arrayOfSplits.filter((split) => {
      return !split.paid;
    });
  }

  return (
    <>
      {arrayOfSplits.map((split) => {
        const { id, amount, paid, date, name, sharedId } = split;
        let { fromCurrency, toValue, fromValue } = amount;
        toValue = addDecimals(toValue);
        fromValue = addDecimals(fromValue);
        return (
          <div
            className={`billSplitItem ${
              !tabBillSplit && "billSplitItemInExpenses"
            }`}
            key={id}
          >
            <div className="iconContainer">
              <AnimatePresence>
                <motion.img
                  key={paid} // Ensure a new image instance is created for animation
                  src={`/${paid ? "paid" : "unpaid"}.svg`}
                  alt={paid ? "paid icon" : "unpaid icon"}
                  className="paidIcon"
                  initial={{ scale: 0.5, y: "-50%" }}
                  animate={{ scale: 1, y: "-50%" }}
                  exit={{ scale: 0, y: "-50%" }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>
            <div className="containerNameAndDate">
              <h2>{name}</h2>
              <p>{unixToDate(date)}</p>
            </div>
            <div>
              <p>
                {homeCurrencySymbol}
                {nFormatter(toValue)}
              </p>
              <p className="foreignAmount">
                {getCurrencySymbol(currencyCodes, fromCurrency)}
                {nFormatter(fromValue)}
              </p>
            </div>
            {!paid && (
              <div className="paidCheckboxContainer">
                <FormElement
                  type="checkbox"
                  label="paid"
                  id="paid"
                  name="paid"
                  callback={() => {
                    dispatch(
                      setPaid({
                        data: splits,
                        id: id,
                        sharedId: sharedId,
                        name: name,
                      })
                    );
                  }}
                  typed={true}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default BillSplitItems;
