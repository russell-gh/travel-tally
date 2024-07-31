import React from "react";
import Button from "../reusable-code/Button";
import FormElement from "../reusable-code/FormElement";
import { useState, useEffect } from "react";
import {
  getExpenseList,
  getThisExpense,
  mergeExpenseDays,
  getThisSplit,
  mergeMultiSplit,
  unixToDateReversed,
} from "../utils/expenseData";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyNames,
  selectSelectedTripId,
  selectTrips,
  deleteToEdit,
  addExpenseData,
  selectPopUp,
  togglePopUp,
  selectSplitData,
  setSplitData,
  setSplitMax,
} from "../redux/homeSlice";
import {
  getActualEndDate,
  getActualStartDate,
  getDateForForm,
  getStartDateForMultiDay,
} from "../utils/utilsDates";
import { findItem } from "../utils/utils";
import SplitInput from "./SplitInput";
import { deleteByID } from "../utils/sync";

export const EditExpense = ({ animatingOut }) => {
  const dispatch = useDispatch();
  const splitData = useSelector(selectSplitData);
  const popUp = useSelector(selectPopUp);
  const tripID = useSelector(selectSelectedTripId);
  const trips = useSelector(selectTrips);
  let [index, setIndex] = useState(0);
  let [formData, setFormData] = useState({
    date: new Date().toLocaleDateString("en-CA"),
    split: false,
    category: "Food",
    description: "test",
    amount: {
      fromValue: 50,
      fromCurrency: "GBP",
      toCurrency: "GBP",
      toValue: 50,
    },
  });
  const [errors, setErrors] = useState({});
  let [multi, setMulti] = useState(false);
  let [expenseList, setExpenseList] = useState([]);
  let [splitList, setSplitList] = useState([]);
  let [splitIndex, setSplitIndexs] = useState([]);
  let [sharedId, setSharedId] = useState([]);
  const currencies = useSelector(selectCurrencyNames);
  const categories = [
    { value: "Activities", name: "Activities" },
    { value: "Food", name: "Food" },
    { value: "Transport", name: "Transport" },
    { value: "Hotel", name: "Hotel" },
    { value: "Other", name: "Other" },
  ];
  if (!currencies || !trips) {
    return <p>Loading</p>;
  }

  const currency = currencies.map((code) => ({ value: code, name: code }));

  const setThisExpense = () => {
    let thisTrip = getExpenseList(tripID, trips);
    setExpenseList(thisTrip.expenses);
    setSplitList(thisTrip.splits);
    let result = getThisExpense(thisTrip.expenses, popUp.id);
    setIndex(result.indexOf);
    const copy = JSON.parse(JSON.stringify(result.thisExpense));
    let date = unixToDateReversed(copy.date);
    let newAmount = copy.amount.fromValue;
    let currency = copy.amount.fromCurrency;
    copy.date = date;
    copy.currency = currency;
    copy.amount = Math.round(newAmount) / 100;
    copy.endDate = date;
    dispatch(setSplitMax(copy.amount));
    setFormData(copy);
    setSharedId(result.thisExpense.sharedId);

    if (copy.split === true) {
      setThisSplit(thisTrip.splits, result.thisExpense.id);
    }
  };

  useEffect(() => {
    setThisExpense();
  }, []);

  const setThisSplit = (splits, id) => {
    let result = getThisSplit(splits, id);
    const copy = JSON.parse(JSON.stringify(result.allSplits));
    copy.forEach((thisSplit, index) => {
      thisSplit.amount = Math.round(thisSplit.amount.fromValue) / 100;
      delete thisSplit.date;
      delete thisSplit.expenseID;
      delete thisSplit.id;
      delete thisSplit.description;
      delete thisSplit.totalExpense;
      const data = thisSplit;
      const tag = index;
      console.log(data, tag, "pre set");
      dispatch(setSplitData({ data, tag }));
    });
    setSplitIndexs(result.allIndexs);
  };

  const dataInput = (e) => {
    let target = e.target.name;
    let value = e.target.value;
    if (value === "true") value = true;
    if (value === "false") value = false;
    setFormData({ ...formData, [target]: value });
  };

  useEffect(() => {
    getValidationResult;
  }, [formData]);
  const getValidationResult = async () => {
    if (!Object.values(formData).length) {
      return;
    }
    const result = await validate(formData, "expense");
    setErrors(result); //result returns promise
    console.log(errors);
  };

  const handleSubmit = () => {
    // if (Object.keys(errors).length) {
    //   console.log(formData, "FAIL", errors);
    //   return;
    // }
    if (formData.description && formData.amount) {
      const data = { formData, splitData };
      const indexs = { index, splitIndex };
      dispatch(deleteToEdit(indexs));
      dispatch(addExpenseData(data));
      // if (multi) {
      //   // delete from server with shared ID
      //   let id = sharedId;
      //   deleteByID({ id, type: "shared", token: state.token });
      //   deleteByID({ id, type: "split", token: state.token });
      // } else {
      //   // delete from server with expense ID
      //   let id = popUp.id;
      //   console.log(formData, "ID");
      //   deleteByID({ id, type: "single", token: state.token });
      //   deleteByID({ id, type: "split", token: state.token });
      // }
    } else {
      console.log("FAIL FINAL");
      return;
    }
  };

  const multiDay = () => {
    setMulti((multi = !multi));
    if (multi) {
      let result = mergeExpenseDays(formData, expenseList);
      let splits = mergeMultiSplit(splitData, splitList);
      console.log(splits, "RESULTS ARE IN");
      if (result.indexs.length > 1) {
        setFormData(result.newExpense);
        setIndex(result.indexs);
        setSplitIndexs(splits.indexs);
        splits.splitArray.forEach((thisSplit, index) => {
          const data = thisSplit;
          const tag = index;
          console.log(data, tag, "pre set");
          dispatch(setSplitData({ data, tag }));
        });
      }
    } else if (!multi) {
      setThisExpense();
    }
  };
  const renderMultiDay = () => {
    if (multi) {
      return (
        <FormElement
          type={"date"}
          label={"End date"}
          name={"endDate"}
          value={formData.endDate}
          id={"endDatePicker"}
          error={errors["endDate"]}
          callback={dataInput}
          minDate={getStartDateForMultiDay(formData.date)}
          maxDate={getDateForForm(actualEndDate)}
        />
      );
    } else {
      return <></>;
    }
  };
  let handleAddPerson = () => {
    dispatch(setSplitData({ data: { amount: 0 }, tag: -2 }));
  };
  let handleRemovePerson = () => {
    dispatch(setSplitData({ data: { amount: 0 }, tag: -1 }));
  };
  const handleEvenSplit = () => {
    const divBy = splitData.length + 1;
    let each = Number(formData.amount) / divBy;
    each = Math.round(each * 100) / 100;
    splitData.forEach((thisSplit, index) => {
      const copy = JSON.parse(JSON.stringify(thisSplit));
      copy.amount = each;
      const data = copy;
      const tag = index;
      dispatch(setSplitData({ data, tag }));
    });
  };

  const getSplitData = (data, tag) => {
    data.amount = Number(data.amount);
    dispatch(setSplitData({ data, tag }));
  };

  const renderSplit = () => {
    if (formData.split === true) {
      return (
        <>
          {splitData.map(function (split, index) {
            return (
              <div className="flex" key={index}>
                <SplitInput
                  maxAmount={formData.amount}
                  tag={index}
                  parentCallback={getSplitData}
                  data={split}
                />
              </div>
            );
          })}
          <div className="containerBtnSplit">
            <Button
              onClick={handleAddPerson}
              text={"Add Person"}
              className={"splitAddPerson"}
            />
            <Button
              onClick={handleRemovePerson}
              text={"Remove Person"}
              className={"splitRemovePerson"}
            />
          </div>
        </>
      );
    }
  };

  //calculating start and enddate of trip
  const trip = findItem(trips, tripID);
  const { details } = trip;
  const { startDateIncluded, endDateIncluded, startDate, endDate } =
    details.dates;
  const actualStartDate = getActualStartDate(startDateIncluded, startDate);
  const actualEndDate = getActualEndDate(endDateIncluded, endDate);

  return (
    <div className="editContainer">
      <div className="flex">
        <FormElement
          type={"date"}
          label={"Date"}
          name={"date"}
          value={formData.date}
          id={"datePicker"}
          callback={dataInput}
          minDate={getDateForForm(actualStartDate)}
          maxDate={getDateForForm(actualEndDate)}
        />
        <div className="multiDayCheckboxContainer">
          <div>
            <FormElement
              type={"checkbox"}
              label={!multi && "Edit all days of this expense"}
              name={"dateCheck"}
              id={"dateCheck"}
              callback={multiDay}
            />
          </div>
          {renderMultiDay()}
        </div>
      </div>
      <div className="flex">
        <FormElement
          type={"text"}
          label={"Description"}
          name={"description"}
          id={"expenseDescription"}
          error={errors["description"]}
          value={formData.description}
          // list={"descriptionOptions"}
          callback={dataInput}
        />
      </div>
      {/* <datalist id="descriptionOptions">
        {expenses.map((expense) => {
          return <option value={expense.description}></option>;
        })}
        </datalist> */}
      <div className="flex">
        <FormElement
          type={"select"}
          label={"Category"}
          name={"category"}
          id={"categorySelectExpense"}
          value={formData.category}
          options={categories}
          error={errors["category"]}
          callback={dataInput}
        />
      </div>
      <div className="flex amountContainer">
        <FormElement
          type={"number"}
          label={"Amount"}
          name={"amount"}
          id={"expenseAmount"}
          minValue={0}
          value={formData.amount}
          error={errors["amount"]}
          callback={dataInput}
        />
        <FormElement
          type={"select"}
          name={"currency"}
          id={"currencySelectExpense"}
          value={formData.currency}
          options={currency}
          callback={dataInput}
        />
      </div>
      <div className={`flex ${formData.split ? "containerSplitEvenly" : ""}`}>
        <FormElement
          type={"select"}
          label={"Split"}
          name={"split"}
          value={formData.split}
          id={"splitExpense"}
          options={[
            { value: false, name: "No" },
            { value: true, name: "Yes" },
          ]}
          callback={dataInput}
        />
        {formData.split && (
          <Button
            onClick={handleEvenSplit}
            text={"Split evenly"}
            className={"splitEvenly"}
          />
        )}
      </div>
      {renderSplit()}
      <div className="containerBtnPopUp">
        <Button
          text="Cancel"
          className="cancelBtnExpense"
          animation={true}
          onClick={() => dispatch(togglePopUp())}
          disabled={animatingOut}
        />
        <Button
          onClick={handleSubmit}
          text={"Edit"}
          className={"expenseSubmit"}
          disabled={animatingOut}
          animation="animation"
        />
      </div>
    </div>
  );
};

export default EditExpense;
