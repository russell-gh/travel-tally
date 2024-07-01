import { useEffect, useState } from "react";
import FormElement from "../FormElement.jsx";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions.js";
import { useDispatch, useSelector } from "react-redux";
import { addTrip } from "../../redux/onboardingSlice.js";
import BudgetBreakdown from "./BudgetBreakdown.jsx";
import { selectTrips } from "../../redux/onboardingSlice.js";
import { validate } from "./validation/validate.js";
import { toPennies, stringToTimestamp, getCurrentTrip } from "./utils.js";
import { nanoid } from "nanoid";

const Onboarding = () => {
  const [onboardingDetails, setOnboardingDetails] = useState({});
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  //access trip details from store
  const trips = useSelector(selectTrips);

  //run state through validate function everytime input is changed.
  useEffect(() => {
    getValidationResult();
  }, [onboardingDetails]);

  const getValidationResult = async () => {
    const result = await validate(onboardingDetails, "trip");
    setErrors(result); //result returns promise
  };

  //store input in state on every change
  const handleChange = (e, id) => {
    setOnboardingDetails({ ...onboardingDetails, [id]: e.target.value });
  };

  //make a copy of state. if errors exist abort early. else send data to store and set visible to true to display second half of form
  const handleSubmit = (e) => {
    e.preventDefault();

    //if errors exist abort early
    if (Object.keys(errors).length) {
      return;
    }
    let _onboardingDetails = onboardingDetails;

    //convert budget to pennies
    const budgetTotal = toPennies(_onboardingDetails.budgetTotal);

    //turn date strings to date objs and then to timestamps
    let startDate = stringToTimestamp(_onboardingDetails.startDate);
    let endDate = stringToTimestamp(_onboardingDetails.endDate);

    //spread existing state and update modified keys
    //generate id and store in state to be passed to budgetbreakdown later
    const _id = nanoid();
    setId(_id)
    _onboardingDetails = {
      id: _id,
      details: { ..._onboardingDetails, startDate, endDate, budgetTotal },
    };
    dispatch(addTrip(_onboardingDetails));
    console.log("added to store");
    setVisible(true);
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
              error={errors[question.id]}
              callback={
                question.type === "button" ? handleSubmit : handleChange
              }
            />
          );
        })}
      </form>
      {/* //only show next part of form once initial data has been sent to store */}
      {visible ? <BudgetBreakdown trip={trips[getCurrentTrip(trips, id)]} /> : ""}
    </div>
  );
};

export default Onboarding;
