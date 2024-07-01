import FormElement from "../FormElement";
import { useState } from "react";

//if a trip exists, run the below. change this to return if no trip and else run the rest of func body
const BudgetBreakdown = ({ trip }) => {
  const [budgetBreakdown, setBudgetBreakdown] = useState({})
  console.log(trip)
  if (trip) { //check why this works and why if (trip) doesn't
    const {budgetTotal, destination, homeCurrency} = trip.details; //need to be able to dynamically access these instead of hardcoding [0]

const handleBudgetBreakdownChange = (e,id) => {
  setBudgetBreakdown({...budgetBreakdown, [id]: e.target.value})
}

    //todo: give all form elements below a callback which stores input in state. In heading text, display the remaining budget as user inputs allocations
    return (
      <div>
        Let's break down your budget of {budgetTotal/100} {homeCurrency}. Allocate
        your budget into the following categories so you can track your
        spending.
        <form>
          <FormElement
            type="number"
            id="budgetHotel"
            name="budgetHotel"
            label="Hotels and accommodation"
            callback={handleBudgetBreakdownChange}
          />
          <FormElement
            type="number"
            id="budgetFood"
            name="budgetFood"
            label="Food"
            callback={handleBudgetBreakdownChange}
          />
          <FormElement
            type="number"
            id="budgetTransport"
            name="budgetTransport"
            label="Transport"
            callback={handleBudgetBreakdownChange}
          />
          <FormElement
            type="number"
            id="budgetActivities"
            name="budgetActivities"
            label="Activities"
            callback={handleBudgetBreakdownChange}
          />
          <FormElement
            type="number"
            id="budgetOther"
            name="budgetOther"
            label="Other"
            callback={handleBudgetBreakdownChange}
          />
        </form>
      </div>
    );
  }
};
export default BudgetBreakdown;
