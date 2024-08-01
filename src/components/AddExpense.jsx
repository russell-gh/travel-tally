import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/expense.scss";
import {
  addExpenseData,
  selectCurrencyNames,
  selectSelectedTripId,
  selectTrips,
  togglePopUp,
  setSplitData,
  selectSplitData,
  setSplitMax,
  selectSplitMax,
} from "../redux/homeSlice";
import Button from "../reusable-code/Button";
import FormElement from "../reusable-code/FormElement";
import { useState, useEffect } from "react";
import { validate } from "../validation/validate";
import { date } from "joi";
import { getExpenseList } from "../utils/expenseData";
import {
  getActualEndDate,
  getActualStartDate,
  getDateForForm,
  getStartDateForMultiDay,
} from "../utils/utilsDates";
import { findItem } from "../utils/utils";
import SplitInput from "./SplitInput";
import dayjs from "dayjs";

export const AddExpense = ({ animatingOut }) => {
  const [inputValues, setInputValues] = useState([]);
  const [friendsNo, setFriendsNo] = useState(0);
  const splitMax = useSelector(selectSplitMax);
  const splitData = useSelector(selectSplitData);
  const dispatch = useDispatch();
  const [typed, setTyped] = useState({});
  const tripID = useSelector(selectSelectedTripId);
  const trips = useSelector(selectTrips);
  let expenses = getExpenseList(tripID, trips).expenses;

  //calculating start and enddate of trip
  const trip = findItem(trips, tripID);
  const { details } = trip;
  const { homeCurrency, destinationCurrency } = details;
  const { startDateIncluded, endDateIncluded, startDate, endDate } =
    details.dates;
  const actualStartDate = getActualStartDate(startDateIncluded, startDate);
  const actualEndDate = getActualEndDate(endDateIncluded, endDate);

  //get standard value for dates
  const currentDate = dayjs();
  const date = currentDate.isBefore(actualStartDate)
    ? getDateForForm(actualStartDate)
    : currentDate.isAfter(actualEndDate)
    ? getDateForForm(actualEndDate)
    : new Date().toLocaleDateString("en-CA");

  const [formData, setFormData] = useState({
    multiDay: false,
    date: date,
    endDate: date,
    amount: 0,
    split: false,
    currency: "GBP",
    category: "Activities",
  });
  const [errors, setErrors] = useState({});
  const [splitErrors, setSplitErrors] = useState({});
  let [multi, setMulti] = useState(false);

  const currencies = useSelector(selectCurrencyNames);
  const categories = [
    { value: "Activities", name: "Activities" },
    { value: "Food", name: "Food" },
    { value: "Transport", name: "Transport" },
    { value: "Hotel", name: "Hotel" },
    { value: "Other", name: "Other" },
  ];

  if (!currencies) {
    return <p>Loading</p>;
  }

  const favs = [homeCurrency, destinationCurrency];
  const _currencies = [...currencies];
  favs.forEach((item) => {
    const found = _currencies.findIndex((el) => el === item);
    _currencies.splice(found, 1);
    _currencies.unshift(item);
  });

  const currency = _currencies.map((code) => ({ value: code, name: code }));

  const dataInput = (e) => {
    let target = e.target.name;
    let value;
    value = e.target.value;
    if (value === "true") value = true;
    if (value === "false") value = false;

    setTyped({ ...typed, [target]: true });

    setFormData({ ...formData, [target]: value });
    if (target === "amount") dispatch(setSplitMax({ value }));
  };

  useEffect(() => {
    getValidationResult();
  }, [formData]);

  useEffect(() => {
    getSplitValidationResult();
  }, [splitData]);

  const getValidationResult = async () => {
    if (!Object.values(formData).length) {
      return;
    }
    const result = await validate(formData, "expense");
    setErrors(result); //result returns promise
    // console.log(errors);
  };

  const getSplitValidationResult = async () => {
    if (formData.split === false) {
      return;
    }
    let errors = [];
    splitData.forEach(async (thisSplit, index) => {
      // Loops over split data array as there can be many
      const result = await validate(thisSplit, "split");
      if (Object.values(result).length) {
        errors[index] = result;
      }
    });
    setSplitErrors(errors); //result returns promise
    console.log(splitErrors);
  };

  const handleSubmit = () => {
    console.log(errors);
    if (Object.keys(errors).length) {
      // Checks for expense validation errors
      console.log(formData, "FAIL", errors);
      return;
    }
    if (Object.keys(splitErrors).length) {
      // Checks for split validation errors
      console.log(splitData, "FAIL", splitErrors);
      return;
    }

    let updatedFormData = formData;

    //set split to false if they do not put in any formData
    if (formData.split === true && splitData.length === 0) {
      updatedFormData = { ...formData, split: false };
    }

    if (formData.description && formData.amount) {
      const result = { formData: updatedFormData, splitData };
      console.log(result, "pass");
      dispatch(addExpenseData(result));
    } else {
      console.log("FAIL FINAL");
      return;
    }
  };

  const multiDay = () => {
    setMulti((multi = !multi));
    const inverted = !formData.multiDay;
    setFormData({ ...formData, multiDay: inverted });
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
          typed={true}
        />
      );
    } else {
      return <></>;
    }
  };

  const handleAddPerson = () => {
    dispatch(setSplitData({ data: { amount: 0 }, tag: -2 }));
  };

  const handleRemovePerson = () => {
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

  //handles on form change
  const getSplitData = (data, tag) => {
    // console.log("getSplitData", data, tag);
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
                  splitErrors={splitErrors}
                />
              </div>
            );
          })}
          <div className="containerBtnSplit">
            <Button
              onClick={handleRemovePerson}
              text={"-"}
              className={"splitRemovePerson"}
            />
            <Button
              onClick={handleAddPerson}
              text={"+"}
              className={"splitAddPerson"}
            />
          </div>
        </>
      );
    }
  };

  //getting datalist
  let datalist = expenses.map((expenses) => {
    return expenses.description;
  });
  datalist = [...new Set(datalist)];
  datalist = datalist.filter((description) => description.trim() !== "");

  console.log(errors);

  return (
    <div className="expenseContainer">
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
          typed={typed.date}
        />

        <div className="multiDayCheckboxContainer">
          <div>
            <FormElement
              type={"checkbox"}
              label={!multi && "Multiple days"}
              name={"dateCheck"}
              id={"dateCheck"}
              callback={multiDay}
              typed={true}
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
          list={"descriptionOptions"}
          callback={dataInput}
          typed={typed.description}
        />
        <datalist id="descriptionOptions">
          {datalist.map((expense, index) => {
            return <option key={index} value={expense}></option>;
          })}
        </datalist>
      </div>
      <div className="flex">
        <FormElement
          type={"select"}
          label={"Category"}
          name={"category"}
          id={"categorySelectExpense"}
          options={categories}
          error={errors["category"]}
          callback={dataInput}
          typed={true}
        />
      </div>
      <div className="flex amountContainer">
        <FormElement
          type={"number"}
          label={"Amount"}
          name={"amount"}
          id={"expenseAmount"}
          minValue={0}
          error={errors["amount"]}
          callback={dataInput}
          typed={typed.amount}
        />
        <FormElement
          type={"select"}
          name={"currency"}
          id={"currencySelectExpense"}
          options={currency}
          callback={dataInput}
          typed={true}
        />
      </div>

      <div className={`flex ${formData.split ? "containerSplitEvenly" : ""}`}>
        <FormElement
          type={"select"}
          label={"Split"}
          name={"split"}
          id={"splitExpense"}
          options={[
            { value: false, name: "No" },
            { value: true, name: "Yes" },
          ]}
          callback={dataInput}
          typed={true}
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
          text={"Add"}
          className={"expenseSubmit"}
          disabled={animatingOut}
          animation={true}
        />
      </div>
    </div>
  );
};

export default AddExpense;
