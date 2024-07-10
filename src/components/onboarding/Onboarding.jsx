import { useEffect, useState } from "react";
import FormElement from "../../reusable-code/FormElement.jsx";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions.js";
import { useDispatch } from "react-redux";
import { validate } from "../../validation/validate.js";
import { BudgetSlider } from "./BudgetSlider.jsx";
import { stringToUnix, toPennies, generateId } from "../../utils/utils.js";
import { getCountryCurrency } from "./onboardingUtils.js";
import { addTrip } from "../../redux/homeSlice.js";

const Onboarding = () => {

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

  const [countryCurrency, setCountryCurrency] = useState([]);

  useEffect(() => {
    getCountryCurrency(setCountryCurrency);
  }, []); //put await here??
  // zv-uncommenting while testing

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

  //store input in state on every change. if the id is a type of budget, convert to a number before store in state
  //e.target.name is used instead of e.target.id because the MUI sliders do not support id attrs but they do support name.
  //(name is equal to id in form elem so works the same)
  const handleChange = (e) => {
    let input = e.target.value;

    //if input is a checkbox, assign input to checked
    if (e.target.type === "checkbox") {
      input = e.target.checked;
    }

    if (e.target.name.toLowerCase().includes("date")) {
      const data = {
        ...onboardingDetails,
        dates: { ...onboardingDetails.dates, [e.target.name]: input },
      };
      setOnboardingDetails(data);

      return;
    }

    //if id is a type of budget convert to a number
    if (e.target.name.includes("budget")) {
      input = parseInt(e.target.value);
    }
    setOnboardingDetails({ ...onboardingDetails, [e.target.name]: input });
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
    let startDate = stringToUnix(_onboardingDetails.dates.startDate);
    let endDate = stringToUnix(_onboardingDetails.dates.endDate);

    //look into why this fixed it
    const startDateIncluded = _onboardingDetails.dates.startDateIncluded;
    const endDateIncluded = _onboardingDetails.dates.endDateIncluded;

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
      }, //zv - fake expenses below. delete after

      expenses: [
        // {
        //   id: "expense_A2rdJ7nN8kJ3fHA25T4gd",
        //   sharedId: "shared_A2rdJ7nN8kJ3fHA25T4gd",
        //   amount: {
        //     fromValue: 2000,
        //     fromCurrency: "EUR",
        //     toCurrency: "GBP",
        //     toValue: 2500,
        //   },
        //   category: "Food",
        //   description: "lunch",
        //   startDate: 1719442800000,
        //   endDate: 1719442800000,
        //   completed: true,
        //   splitBill: false,
        // },
        // {
        //   id: "expense_A3rdJ7nN8kJ3fHA25T4gd",
        //   sharedId: "shared_A2rdJ7nN8kJ3fHA25T4gd",
        //   amount: {
        //     fromValue: 2000,
        //     fromCurrency: "EUR",
        //     toCurrency: "GBP",
        //     toValue: 2500,
        //   },
        //   category: "Food",
        //   description: "lunch",
        //   startDate: 1719356400000,
        //   endDate: 1719356400000,
        //   completed: true,
        //   splitBill: false,
        // },
      ],
    };

    dispatch(addTrip({ text: "trips", data: _onboardingDetails }));
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
