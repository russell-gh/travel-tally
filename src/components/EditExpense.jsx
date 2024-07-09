import React from "react";
import Button from "../reusable-code/Button";
import FormElement from "../reusable-code/FormElement";
import { useState, useEffect } from "react";
import { getExpenseList, getThisExpense, mergeExpenseDays } from "../utils/expenseData";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyNames,
  selectSelectedTripId,
  selectTrips,
  deleteToEdit,
  addExpenseData,
} from "../redux/homeSlice";

export const EditExpense = () => {
  const dispatch = useDispatch();
  const id = "_expense_y7LAyA6ZBN2t7QRRvieZG";
  const tripID = useSelector(selectSelectedTripId);
  const trips = useSelector(selectTrips);
  let [index, setIndex] = useState(0);
  let [formData, setFormData] = useState({
    date: new Date().toLocaleDateString("en-CA"),
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
  let [multi, setMulti] = useState(false);
  let [expenseList, setExpenseList] = useState([]);
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

  const currency = currencies.map((code) => ({ value: code, name: code }));

  const setThisExpense = () => {
    let expenses = getExpenseList(tripID, trips);
    setExpenseList(expenses);
    console.log(expenses, 'EXPENSES');
    let result = getThisExpense(expenses, id);
    console.log(result, 'RESULT');
    setIndex(result.indexOf);
    // const copy = JSON.parse(JSON.stringify(mergeExpenseDays(result.thisExpense, expenses)));
    const copy = JSON.parse(JSON.stringify(result.thisExpense));
    let date = new Date(formData.date).toLocaleDateString("en-CA");
    let newAmount = copy.amount.fromValue;
    let currency = copy.amount.fromCurrency;
    copy.date = date;
    copy.currency = currency;
    copy.amount = Math.round(newAmount) / 100;
    copy.endDate = date;
    setFormData(copy);
  };

  useEffect(() => {
    setThisExpense();
  }, [])

  // if (loaded === false) {
  //   setLoaded(true);
    
  // }
  const dataInput = (e) => {
    // getValidationResult();
    let target = e.target.name;
    let value = e.target.value;
    if (value === "true") value = true;
    if (value === "false") value = false;
    setFormData({ ...formData, [target]: value });
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
      dispatch(deleteToEdit(index));
      dispatch(addExpenseData(formData));
    } else {
      console.log("FAIL FINAL");
      return;
    }
  };
    const multiDay = () => {
      setMulti((multi = !multi));
      if(multi) {
        setFormData(mergeExpenseDays(formData, expenseList))
      } else if (!multi) {
        setThisExpense()
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
          />
        );
      } else {
        return <></>;
      }
    };

  return (
    <>
      <div className="editContainer">
        <div>
          <FormElement
            type={"date"}
            label={"Date"}
            name={"date"}
            value={formData.date}
            id={"datePicker"}
            callback={dataInput}
          />
          {renderMultiDay()}
        <FormElement
          type={"checkbox"}
          label={"Edit all days of this expense"}
          name={"dateCheck"}
          id={"dateCheck"}
          callback={multiDay}
        />
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
