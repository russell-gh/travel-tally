import React from "react";
import Button from "../reusable-code/Button";
import FormElement from "../reusable-code/FormElement";
import { useState, useEffect } from "react";
import { getExpenseList, getThisExpense } from "../utils/expenseData";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyNames,
  selectSelectedTripId,
  selectTrips,
  deleteToEdit,
} from "../redux/homeSlice";

export const EditExpense = () => {
  const dispatch = useDispatch();
  const id = "expense_D2rdJ7nN8kJ3fHA25T4gd";
  const tripID = useSelector(selectSelectedTripId);
  const trips = useSelector(selectTrips);
  let [loaded, setLoaded] = useState(false);
  let [formData, setFormData] = useState({
    startDate: new Date().toLocaleDateString("en-CA"),
    // endDate: new Date().toLocaleDateString("en-CA"),
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
  const currencies = useSelector(selectCurrencyNames);
  const categories = [
    { value: "Food", name: "Food" },
    { value: "Accomodation", name: "Accomodation" },
    { value: "Travel", name: "Travel" },
    { value: "Other", name: "Other" },
  ];
  if (!currencies || !trips) {
    return <p>Loading</p>;
  }
  console.log(formData);

  const currency = currencies.map((code) => ({ value: code, name: code }));

  const setThisExpense = () => {
    let expenses = getExpenseList(tripID, trips);
    let result = getThisExpense(expenses, id);
    setFormData((formData = { ...result.thisExpense }));
    let date = new Date(formData.date).toLocaleDateString("en-CA");
    console.log(date);
  };

  if (loaded === false) {
    setThisExpense();
    setLoaded((loaded = true));
  }
  const dataInput = (e) => {
    // getValidationResult();
    let target = e.target.name;
    let value = e.target.value;
    if (value === "true") value = true;
    if (value === "false") value = false;
    if (target === "amount") {
      let newAmount = { ...formData };
      // newAmount.amount.fromValue = value;
      console.log(newAmount);
      // setFormData({ newAmount });
    } else {
      setFormData({ ...formData, [target]: value });
    }
  };
  // const getValidationResult = async () => {
  //   if (!Object.values(formData).length) {
  //     return;
  //   }
  //   const result = await validate(formData, "expense");
  //   setErrors(result); //result returns promise
  //   console.log(errors);
  // };

  const handleSubmit = () => {
    // if (Object.keys(errors).length) {
    //   console.log(formData, "FAIL", errors);
    //   return;
    // }
    if (formData.description && formData.amount) {
      console.log(formData, "pass");
      dispatch(deleteToEdit(result.indexOf));
      // dispatch(addExpenseData(formData));
    } else {
      console.log("FAIL FINAL");
      return;
    }
  };
  //   const multiDay = () => {
  //     setMulti((multi = !multi));
  //     const inverted = !formData.multiDay;
  //     setFormData({ ...formData, multiDay: inverted });
  //   };
  //   const renderMultiDay = () => {
  //     if (multi) {
  //       return (
  //         <FormElement
  //           type={"date"}
  //           label={"End date"}
  //           name={"endDate"}
  //           value={formData.endDate}
  //           id={"endDatePicker"}
  //           error={errors["endDate"]}
  //           callback={dataInput}
  //         />
  //       );
  //     } else {
  //       return <></>;
  //     }
  //   };

  return (
    <>
      <div className="editContainer">
        <div>
          <FormElement
            type={"date"}
            label={"Date"}
            name={"startDate"}
            value={formData.startDate}
            id={"datePicker"}
            callback={dataInput}
          />
          {/* {renderMultiDay()}
        <FormElement
          type={"checkbox"}
          label={"Multiple days"}
          name={"dateCheck"}
          id={"dateCheck"}
          callback={multiDay}
        /> */}
        </div>
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
        {/* <datalist id="descriptionOptions">
        {expenses.map((expense) => {
          return <option value={expense.description}></option>;
        })}
      </datalist> */}
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
        <div>
          <FormElement
            type={"number"}
            label={"Amount"}
            name={"amount"}
            id={"expenseAmount"}
            minValue={0}
            value={formData.amount.fromValue}
            error={errors["amount"]}
            callback={dataInput}
          />
          <FormElement
            type={"select"}
            name={"currency"}
            id={"currencySelectExpense"}
            value={formData.amount.fromCurrency}
            options={currency}
            callback={dataInput}
          />
        </div>

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

        <Button
          onClick={handleSubmit}
          text={"Add"}
          className={"expenseSubmit"}
        />
      </div>
    </>
  );
};

export default EditExpense;
