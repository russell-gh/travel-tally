import { useEffect, useState } from "react";
import FormElement from "../../reusable-code/FormElement.jsx";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions.js";
import { useDispatch, useSelector } from "react-redux";
import { addTrip } from "../../redux/onboardingSlice.js";
import { validate } from "./validation/validate.js";
import { toPennies, stringToTimestamp, generateId } from "./utils.js";
import Button from "../../reusable-code/Button.jsx";

const Onboarding = () => {
  const [onboardingDetails, setOnboardingDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budgetTotal: "",
    homeCurrency: ",",
    budgetHotel: "",
    budgetFood: "",
    budgetTransport: "",
    budgetActivities: "",
    budgetOther: "",
  });
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  //run state through validate function everytime input is changed.
  useEffect(() => {
    getValidationResult();
  }, [onboardingDetails]);

  const getValidationResult = async () => {
    if (!Object.values(onboardingDetails).length) {
      return;
    }
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

    //convert budgets to pennies
    const budgetTotal = toPennies(_onboardingDetails.budgetTotal);
    const budgetHotel = toPennies(_onboardingDetails.budgetHotel);
    const budgetFood = toPennies(_onboardingDetails.budgetFood);
    const budgetTransport = toPennies(_onboardingDetails.budgetTransport);
    const budgetActivities = toPennies(_onboardingDetails.budgetActivities);
    const budgetOther = toPennies(_onboardingDetails.budgetOther);

    //turn date strings to date objs and then to timestamps
    let startDate = stringToTimestamp(_onboardingDetails.startDate);
    let endDate = stringToTimestamp(_onboardingDetails.endDate);

    //spread existing state and update modified keys
    _onboardingDetails = {
      id: generateId("trip"),
      details: {
        ..._onboardingDetails,
        startDate,
        endDate,
        budgetTotal,
        budgetHotel,
        budgetFood,
        budgetTransport,
        budgetActivities,
        budgetOther,
      },
    };

    dispatch(addTrip(_onboardingDetails));
  };

  const createFormSection = (section) => {
    return (
      <div>
        {section.map((question) => {
          return (
            <FormElement
              key={question.id}
              type={question.type}
              id={question.id}
              label={question.label}
              name={question.name}
              value={onboardingDetails[question.id]}
              options={question.options}
              defaultValue={question.defaultValue}
              error={errors[question.id]}
              callback={
                question.type === "button" ? handleSubmit : handleChange
              }
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <form>
        {createFormSection(onboardingQuestions.primaryForm)}
        <Button text={"test"} className={"viewMore"} />
        {createFormSection(onboardingQuestions.secondaryForm)}
      </form>
    </div>
  );
};

export default Onboarding;
