import { useEffect, useState } from "react";
import FormElement from "../../reusable-code/FormElement.jsx";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions.js";
import { useDispatch, useSelector } from "react-redux";
import { addTrip, selectTrip } from "../../redux/onboardingSlice.js";
import { validate } from "./validation/validate.js";
import { toPennies, stringToTimestamp, generateId } from "./utils.js";
import { BudgetSlider } from "./BudgetSlider.jsx";

const Onboarding = () => {
  const trips = useSelector(selectTrip);

  const [onboardingDetails, setOnboardingDetails] = useState({
    destination: "",
    dates: {
      startDate: "",
      endDate: "",
      startDateIncluded: false,
      endDateIncluded: false,
    },
    budgetTotal: 0,
    homeCurrency: "",
    budgetHotel: 0,
    budgetFood: 0,
    budgetTransport: 0,
    budgetActivities: 0,
    budgetOther: 0,
  });

  const [visible, setVisible] = useState(true); //change to false after testing
  const [errors, setErrors] = useState({});

  //set original remaining to total budget

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

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //check if all fields in the primary form are validated and if true set visible to true in order to display secondary form
  const ids = [];
  const checkPrimaryFormValidation = (validationResult) => {
    onboardingQuestions.primaryForm.forEach((question) =>
      ids.push(question.id)
    );
    const errorIds = Object.keys(validationResult);
    const result = ids.some((id) => errorIds.includes(id));
    if (!result) {
      setVisible(true);
    }
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //store input in state on every change. if the id is a type of budget, convert to a number before store in state
  const handleChange = (e, id) => {
    let input = e.target.value;

    //if input is a checkbox, assign input to checked
    if (e.target.type === "checkbox") {
      input = e.target.checked;
    } 

        // if ((e.target.id).includes("date")) {console.log("its a date")}
        if (id.toLowerCase().includes("date")) {
          setOnboardingDetails({ ...onboardingDetails, dates:{...onboardingDetails.dates, [id]: input} });
          return;
        }

    //if id is a type of budget convert to a number
    if (id.includes("budget")) {
      input = parseInt(e.target.value);
    }

    setOnboardingDetails({ ...onboardingDetails, [id]: input });
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
    let startDate = stringToTimestamp(_onboardingDetails.dates.startDate);
    let endDate = stringToTimestamp(_onboardingDetails.dates.endDate);

    //spread existing state and update modified keys
    _onboardingDetails = {
      id: generateId("trip"),
      details: {
        ..._onboardingDetails,
        dates: { startDate, endDate, startDateIncluded, endDateIncluded },
        budgetTotal,
        budgetHotel,
        budgetFood,
        budgetTransport,
        budgetActivities,
        budgetOther,
      },
    };

    console.log("about to add", _onboardingDetails);
    dispatch(addTrip(_onboardingDetails));
    console.log(trips);
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
              value={
                question.id.includes("date")
                  ? onboardingDetails.dates[question.id]
                  : question.id.includes("budget")
                  ? onboardingDetails[question.id].toString()
                  : onboardingDetails[question.id]
              }
              options={question.options}
              defaultValue={question.defaultValue}
              error={errors[question.id]}
              choose={question.choose}
              onboardingDetails={onboardingDetails}
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

        {visible && (
          <div>
            {onboardingQuestions.secondaryForm.map((question) => {
              return (
                <BudgetSlider
                  key={question.id}
                  label={question.label}
                  budgetTotal={onboardingDetails.budgetTotal}
                  id={question.id}
                  callback={handleChange}
                  onboardingDetails={onboardingDetails}
                />
              );
            })}

            {createFormSection(onboardingQuestions.submit)}
          </div>
        )}
      </form>
    </div>
  );
};

export default Onboarding;
