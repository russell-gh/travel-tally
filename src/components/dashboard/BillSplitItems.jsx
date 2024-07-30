import { unixToDate } from "../../utils/utilsDates";
import {
  addDecimals,
  getCurrencySymbol,
  nFormatter,
} from "../../utils/utilsBudget";
import FormElement from "../../reusable-code/FormElement";
import { useDispatch, useSelector } from "react-redux";
import { selectHidePaidSplitBills, setPaid } from "../../redux/homeSlice";

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
            <img
              src={`../src/img/${paid ? "paid" : "unpaid"}.svg`}
              alt={paid ? "paid icon" : "unpaid icon"}
              className="paidIcon"
            />
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
