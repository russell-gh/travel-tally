import { useEffect, useState } from "react";
import FormElement from "../../reusable-code/FormElement.jsx";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions.js";
import { useDispatch, useSelector } from "react-redux";
import { addTrip, selectTrips } from "../../redux/onboardingSlice.js";
import { validate } from "./validation/validate.js";
import { toPennies, stringToTimestamp, generateId } from "./utils.js";

const Onboarding = () => {

  // const trips = useSelector(selectTrips);
  // console.log(trips)

  const [onboardingDetails, setOnboardingDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budgetTotal: "",
    homeCurrency: "",
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
    checkPrimaryFormValidation(result);
    setErrors(result);
  };

  //check if all fields in the primary form are validated and if true set visible to true in order to display secondary form
  const checkPrimaryFormValidation = (validationResult) => {
    console.log("loop starts");

    //loop through all the questions in the primary form
    onboardingQuestions.primaryForm.forEach((question) => {
      // console.log(
      //   question.id,
      //   Object.keys(validationResult),
      //   Object.keys(validationResult).includes(question.id)
      // );

      //compare the id of that question against the keys of the validation result to see whether there are any errors present which correspond to that id
      const primaryFormErrors = key => !key.includes(question.id) 
      const checkErrors = Object.keys(validationResult).every(primaryFormErrors)
      console.log(checkErrors)
    });

    setVisible(true);
  };

  //store input in state on every change. if the id is a type of budget, convert to a number before store in state
  const handleChange = (e, id) => {
    if (id.includes("budget")) {
      e.target.value = Number(e.target.value);
    }
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

    //convert budgets to pennies. 
    //too repetitive. condense
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

    console.log("about to add", _onboardingDetails)
    dispatch(addTrip(_onboardingDetails));
    console.log(trips)
  };

  //can we move this to another file? would also have to move handlesubmit and handlechange funcs
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

        {/* <Button text={"test"} className={"viewMore"} /> */}

        {visible && (
          <>
            <h1>
              Great. Let's break down your budget of{" "}
              {onboardingDetails.budgetTotal} {onboardingDetails.homeCurrency}
            </h1>
            {/* change this to a func and add message to be displayed if they over-allocate */}
            <h2>
              You have{" "}
              {onboardingDetails.budgetTotal -
                onboardingDetails.budgetHotel -
                onboardingDetails.budgetOther -
                onboardingDetails.budgetActivities -
                onboardingDetails.budgetTransport -
                onboardingDetails.budgetFood}{" "}
              {onboardingDetails.homeCurrency} remaining to allocate.
            </h2>

            {createFormSection(onboardingQuestions.secondaryForm)}
          </>
        )}
      </form>
    </div>
  );
};

export default Onboarding;
