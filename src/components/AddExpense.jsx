import React from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import { selectCurrencyAPIData } from "../redux/counterSlice";

export const AddExpense = () => {
  const apiData = useSelector(selectCurrencyAPIData);

  const onClick = () => {
    console.log("clicky");
  };
  return (
    <></>
    // <div>
    //   <input type="date" />
    //   <select name="category" id="">
    //     <option disabled selected value>
    //       Category
    //     </option>
    //     <option value={"Food"}>Food</option>
    //     <option value={"Accomodation"}>Accomodation</option>
    //     <option value={"Travel"}>Travel</option>
    //     <option value={"Other"}>Other</option>
    //   </select>
    //   <div>
    //     <input type="number" />
    //     <select name="currency" id="">
    //       <option disabled selected value>
    //         Currency
    //       </option>
    //       <option value={"GBP"}>GBP</option>
    //       <option value={"EUR"}>EUR</option>
    //       <option value={"USD"}>USD</option>
    //       <option value={"THB"}>THB</option>
    //     </select>
    //   </div>
    //   <input type="text" />
    //   <select name="split" id="">
    //     <option disabled selected value>
    //       Split?
    //     </option>
    //     <option value={"No"}>No</option>
    //     <option value={"Yes"}>Yes</option>
    //   </select>
    //   <Button onClick={onClick} text={"Submit"} className={"expenseSubmit"} />
    // </div>
  );
};

export default AddExpense;
