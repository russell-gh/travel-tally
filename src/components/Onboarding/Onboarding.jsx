import { useEffect, useState } from "react";
import FormElement from "../FormElement";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions";
import { useDispatch, useSelector } from "react-redux";
import { addTrip } from "../../redux/onboardingSlice";
import Joi from "joi";
import BudgetBreakdown from "./BudgetBreakdown";
import { selectTrip } from "../../redux/onboardingSlice";
import { tripSchema } from "./validation/schemas.js";
import { validate } from "./validation/validate.js";

const Onboarding = () => {
  const [onboardingDetails, setOnboardingDetails] = useState({});
  const [validated, setValidated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  //access trip details from store
  const trip = useSelector(selectTrip);

  //run state through validate function everytime input is changed. 
  useEffect(() => {
    const result = validate(onboardingDetails, "trip", setValidated);
    setErrors(result) //result returns promise 
  }, [onboardingDetails]);

  //validation. if all tests are successful change validated state to true

  //store input in state on every change
  const handleChange = (e, id) => {
    setOnboardingDetails({ ...onboardingDetails, [id]: e.target.value });
  };

  //make a copy of state. if validated is true, send data to store and set visible to true
  const handleSubmit = (e) => {
    e.preventDefault();
    let _onboardingDetails = onboardingDetails;

    //convert budget to pennies
    let budgetTotal = _onboardingDetails.budgetTotal;
    budgetTotal *= 100

    //turn date strings to date objs and then to timestamps
    let startDate = _onboardingDetails.startDate;
    let endDate = _onboardingDetails.endDate;
    const dates = [startDate, endDate].map((date) => {
      date = date.split("-");
      date = new Date(date[0], date[1]-1, date[2])
      return date;
    });
    _onboardingDetails = {..._onboardingDetails, startDate: dates[0].getTime(), endDate:dates[1].getTime(), budgetTotal}

    if (validated) {
      dispatch(addTrip(_onboardingDetails)); //currently sending through copy of original state without any date formatting
      console.log("added to store");
      setVisible(true);
    } else {
      console.log("Check all fields have been entered correctly");
    }
  };
  return (
    <div>
      <form>
        {onboardingQuestions.map((question) => {
          return (
            <FormElement
              key={question.id}
              type={question.type}
              id={question.id}
              label={question.label}
              name={question.name}
              options={question.options}
              defaultValue={question.defaultValue}
              error = {errors[question.id]}
              callback={
                question.type === "button" ? handleSubmit : handleChange
              }
            />
          );
        })}
      </form>
      {/* //only show next part of form once initial data has been sent to store */}
      {visible ? <BudgetBreakdown trip={trip} /> : ""}
    </div>
  );
};

export default Onboarding;
