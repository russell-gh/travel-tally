import FormElement from "../FormElement";
import { useState } from "react";

const BudgetBreakdown = ({trip}) => {
if (trip[0]){                                //check why this works and why if (trip) doesn't
    const budgetTotal = trip[0].budgetTotal; //need to be able to dynamically access these instead of hardcoding [0]
  const destination = trip[0].destination;
  const homeCurrency = trip[0].homeCurrency;


//   const [budgetBreakdown,setBudgetBreakdown] = useState({})

//give all form elements a callback
  return (
    <div>
      Let's break down your budget of {budgetTotal} {homeCurrency}. Allocate
      your budget into the following categories so you can track your spending.

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
  );}
};
export default BudgetBreakdown;
