import { useEffect, useState } from "react";
import FormElement from "../FormElement";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions";
import { useDispatch, useSelector } from "react-redux";
import { addTrip } from "../../redux/onboardingSlice";
import Joi from "joi";
import BudgetBreakdown from "./BudgetBreakdown";
import { selectTrip } from "../../redux/onboardingSlice";
import { schema } from "./validation.js";

const Onboarding = () => {
  const [onboardingDetails, setOnboardingDetails] = useState({});
  const [validated, setValidated] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  //access trip details from store
  const trip = useSelector(selectTrip);

  //run state through validate function everytime input is changed
  useEffect(() => {
    validate();
  }, [onboardingDetails]);

  //validation. if all tests are successful change validated state to true
  //abstract this further? + write errors into DOM
  const validate = async () => {
    const _joi = Joi.object(schema);
    try {
      const result = await _joi.validateAsync(onboardingDetails);
      console.log(result);
      setValidated(true);
    } catch (e) {
      setValidated(false);
      console.log(e);
    }
  };

  //store input in state on every change
  const handleChange = (e, id) => {
    setOnboardingDetails({ ...onboardingDetails, [id]: e.target.value });
  };

  //make a copy of state. if validated is true, send data to store and set visible to true
  //check what to do with date
  const handleSubmit = (e) => {
    e.preventDefault();
    let _onboardingDetails = onboardingDetails;

    // let startDate = _onboardingDetails.startDate;
    // let endDate = _onboardingDetails.endDate;
    // const dates = [startDate, endDate].map((date) => {
    //   date = date.split("-");
    //   date = new Date(date[0], date[1]-1, date[2])
    //   return date;
    // });
    // _onboardingDetails = {..._onboardingDetails, startDate: dates[0], endDate:dates[1]}

    if (validated) {
      dispatch(addTrip(_onboardingDetails)); //currently sending through copy of original state without any date formatting
      console.log("added to store");
      setVisible(true);
    } else {
      console.log("Check all fields have been entered correctly");
    }
  };

  console.log(trip);
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
