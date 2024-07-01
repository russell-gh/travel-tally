import FormElement from "../FormElement";
import { useState } from "react";

//if a trip exists, run the below. change this to return if no trip and else run the rest of func body
const BudgetBreakdown = ({ trip }) => {
  if (trip[0]) { //check why this works and why if (trip) doesn't
    const {budgetTotal, destination, homeCurrency} = trip[0]; //need to be able to dynamically access these instead of hardcoding [0]

    //todo: give all form elements below a callback which stores input in state. In heading text, display the remaining budget as user inputs allocations
    return (
      <div>
        Let's break down your budget of {budgetTotal} {homeCurrency}. Allocate
        your budget into the following categories so you can track your
        spending.
        <form>
          <FormElement
            type="number"
            id="budgetHotel"
            name="budgetHotel"
            label="Hotels and accommodation"
          />
          <FormElement
            type="number"
            id="budgetFood"
            name="budgetFood"
            label="Food"
          />
          <FormElement
            type="number"
            id="budgetTransport"
            name="budgetTransport"
            label="Transport"
          />
          <FormElement
            type="number"
            id="budgetActivities"
            name="budgetActivities"
            label="Activities"
          />
          <FormElement
            type="number"
            id="budgetOther"
            name="budgetOther"
            label="Other"
          />
        </form>
      </div>
    );
  }
};
export default BudgetBreakdown;
