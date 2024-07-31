import { useEffect, useState } from "react";
import FormElement from "../../reusable-code/FormElement.jsx";
import Button from "../../reusable-code/Button.jsx";
import { onboardingQuestions } from "./onboardingQuestions.js";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../validation/validate.js";
import { BudgetSlider } from "./BudgetSlider.jsx";
import { stringToUnix, toPennies, generateId } from "../../utils/utils.js";
import {
  checkBudgetAllocationTotals,
  checkFormSectionErrors,
  getCountryFromCity,
} from "./onboardingUtils.js";
import { addTrip, selectToken } from "../../redux/homeSlice.js";
import { useNavigate } from "react-router-dom";
import { selectCountries, selectCurrencyCodes } from "../../redux/homeSlice.js";
import "../../css/onboarding.scss";
import axios from "axios";
import { jsxs } from "react/jsx-runtime";
import { getCurrencySymbol } from "../../utils/utilsBudget.js";

const Onboarding = () => {
  const currencyCodes = useSelector(selectCurrencyCodes);
  const token = useSelector(selectToken);

  let currencies = [];
  for (const key of Object.keys(currencyCodes)) {
    currencies.push({ value: key, name: key });
  }

  const [onboardingDetails, setOnboardingDetails] = useState({
    destination: "",
    dates: {
      startDate: "",
      endDate: "",
      startDateIncluded: false,
      endDateIncluded: false,
    },
    budgetTotal: 0,
    homeCurrency: currencies[0].value,
    homeCurrencySymbol: getCurrencySymbol(currencyCodes, currencies[0].value),
    destinationCurrency: "",
    budgetHotel: 0,
    budgetFood: 0,
    budgetTransport: 0,
    budgetActivities: 0,
    budgetOther: 0,
  });

  const [currentFormSection, setCurrentFormSection] = useState(1);
  const [errors, setErrors] = useState({});
  const [sliderError, setSliderError] = useState(false);
  const [typed, setTyped] = useState({});

  console.log(currencies);

  // getCountryCurrency("london", 5);
  // useEffect(() => {
  //   getCountryCurrency(setCountryCurrency);
  // }, []);

  const dispatch = useDispatch();
  const redirect = useNavigate();

  const countries = useSelector(selectCountries);
  let _countries;
  if (countries) {
    _countries = JSON.parse(JSON.stringify(countries));
    _countries = _countries.sort((a, b) => {
      if (a.capitalCity < b.capitalCity) {
        return -1;
      }
      if (a.capitalCity > b.capitalCity) {
        return 1;
      }
      return 0;
    });
  }

  //run state through validate function everytime input is changed.
  useEffect(() => {
    getValidationResult();
  }, [onboardingDetails]);

  const getValidationResult = async () => {
    if (!Object.values(onboardingDetails).length) {
      return;
    }
    const result = await validate(onboardingDetails, "trip");
    setErrors(result);
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
      setTyped({ ...typed, [e.target.name]: true });
      setOnboardingDetails(data);
      return;
    }

    //if id is a type of budget convert to a number
    if (e.target.name.includes("budget")) {
      input = parseInt(e.target.value);
    }
    setTyped({ ...typed, [e.target.name]: true });
    setOnboardingDetails({ ...onboardingDetails, [e.target.name]: input });
  };

  //make a copy of state. if errors exist abort early. else send data to store and set visible to true to display second half of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkBudgetAllocationTotals(onboardingDetails);
    if (!checkBudgetAllocationTotals(onboardingDetails)) {
      setSliderError(true);
      return;
    }
    console.log(errors);
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
      },
      expenses: [],
      splits: [],
    };
    console.log(_onboardingDetails);
    await axios.post(
      "http://localhost:6001/onboarding",
      { _onboardingDetails },
      { headers: { token } }
    );
    dispatch(addTrip({ text: "trips", data: _onboardingDetails }));
    redirect("/dashboard");
  };

  const formButtonHandler = () => {
    //display errors present for any elems which haven't yet been interacted with (and therefore not displayed)
    //create func to check errcurrentFormSection

    const errorsPresent = checkFormSectionErrors(currentFormSection, errors);
    // setTyped(true); //for all the errs in that section.

    //if section 1 has no errors run the below func on click and pass in destination state.
    if (currentFormSection === 1 && !errorsPresent) {
      getDestinationCurrency(onboardingDetails.destination);
    }

    if (currentFormSection === 3 && !errorsPresent) {
      setOnboardingDetails({
        ...onboardingDetails,
        homeCurrencySymbol: getCurrencySymbol(
          currencyCodes,
          onboardingDetails.homeCurrency
        ),
      });
    }

    //if no errors are present, increment state which renders next section
    !errorsPresent ? setCurrentFormSection(currentFormSection + 1) : "";
  };

  const getDestinationCurrency = async (city) => {
    let currencyCode;
    let index;

    //check if city passed through is in the hardcoded data.
    index = _countries.findIndex((country) => {
      return country.capitalCity.toLowerCase() === city.toLowerCase();
    });

    //if not in json data, run city through weather api to get iso2 code for country
    //find index where iso2 code from api matches iso2 code in json data
    if (index === -1) {
      const countryFromApi = await getCountryFromCity(city);
      //=======
      index = _countries.findIndex((c) => {
        return c.isoCode2 === countryFromApi;
      });
    }

    //use index to access currency code
    currencyCode = _countries[index].currencyCode;

    if (!currencyCode) {
      currencyCode = "";
    }

    //add currency code to state
    setOnboardingDetails({
      ...onboardingDetails,
      destinationCurrency: currencyCode,
    });
  };

  if (!_countries) {
    return <p>...Loading</p>;
  }

  return (
    <div className="onboarding">
      <form>
        {currentFormSection === 1 && (
          <div className="formSection">
            <FormElement
              type="text"
              id="destination"
              label="Where are you off to?"
              name="destination"
              value={onboardingDetails.destination}
              callback={handleChange}
              error={errors.destination}
              typed={typed.destination}
              list={"cities"}
            />
            <datalist id="cities">
              {_countries.map((country) => {
                return (
                  <option
                    key={country["capitalCity"]}
                    value={country["capitalCity"]}
                  ></option>
                );
              })}
            </datalist>
          </div>
        )}
        {currentFormSection === 2 && (
          <div className="formSection">
            <FormElement
              type="date"
              id="startDate"
              label="Choose the start and end dates of your trip"
              name="startDate"
              value={onboardingDetails.dates.startDate}
              callback={handleChange}
              error={errors.startDate}
              typed={typed.startDate}
            />
            <FormElement
              type="date"
              id="endDate"
              name="endDate"
              value={onboardingDetails.dates.endDate}
              callback={handleChange}
              error={errors.endDate}
              typed={typed.endDate}
            />
            <div className="checkboxInput">
              <FormElement
                type="checkbox"
                id="startDateIncluded"
                label="Include first day of trip in budget?"
                name="startDateIncluded"
                value={onboardingDetails.dates.startDateIncluded}
                callback={handleChange}
              />
            </div>
            <div className="checkboxInput">
              <FormElement
                type="checkbox"
                id="endDateIncluded"
                label="Include last day of trip in budget?"
                name="endDateIncluded"
                value={onboardingDetails.dates.endDateIncluded}
                callback={handleChange}
              />
            </div>
          </div>
        )}
        {currentFormSection === 3 && (
          <div className="formSection">
            <div className="budgetTotalSection">
              <FormElement
                type="number"
                id="budgetTotal"
                className="budgetTotal"
                label="Enter your total budget for the trip and the currency of your home country"
                name="budgetTotal"
                value={onboardingDetails.budgetTotal.toString()}
                callback={handleChange}
                error={errors.budgetTotal}
                typed={typed.budgetTotal}
                minValue={0}
              />
              <FormElement
                type="select"
                id="homeCurrency"
                name="homeCurrency"
                className="homeCurrency"
                // choose={true}
                options={currencies}
                value={currencies[0].value}
                callback={handleChange}
                error={errors.homeCurrency}
                typed={typed.homeCurrency}
              />
            </div>
          </div>
        )}
        {currentFormSection === 4 && (
          <div className="formSection">
            <p className="budgetSlidersLabel">
              How would you like to allocate your budget?
            </p>
            {onboardingQuestions.secondaryForm.map((question) => {
              //get rid of primary form as no longer used? then change this name
              return (
                <BudgetSlider
                  key={question.id}
                  label={question.label}
                  budgetTotal={onboardingDetails.budgetTotal}
                  id={question.id}
                  callback={handleChange}
                  onboardingDetails={onboardingDetails}
                  sliderError={sliderError}
                  setSliderError={setSliderError}
                />
              );
            })}
            {sliderError && (
              <p className="validationError">
                There is still some of your budget left to allocate.
              </p>
            )}
          </div>
        )}

        {currentFormSection === 4 ? (
          <FormElement type="button" className="btn" callback={handleSubmit} />
        ) : (
          <Button
            text=">"
            onClick={() => formButtonHandler()}
            animation={true}
          />
        )}
      </form>
    </div>
  );
};

export default Onboarding;
