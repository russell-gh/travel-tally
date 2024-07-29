import { currencyCodes } from "./dummyCurrencyCodes.js"; //change dummy to get from Jacks api call

let currencies = [];

for (const key of Object.keys(currencyCodes)) {
  currencies.push({ value: key, name: key });
}
export const onboardingQuestions = {
  primaryForm: [
    {
      type: "text",
      id: "destination",
      label: "Where are you off to?",
      name: "destination",
    },
    {
      type: "date",
      id: "startDate",
      label: "Choose the start date of your trip",
      name: "startDate",
    },
    {
      type: "date",
      id: "endDate",
      label: "Choose the end date of your trip",
      name: "endDate",
    },
    {
      type: "checkbox",
      id: "startDateIncluded",
      label: "Include first day of trip in budget?",
      name: "startDateIncluded",
    },
    {
      type: "checkbox",
      id: "endDateIncluded",
      label: "Include last day of trip in budget?",
      name: "endDateIncluded",
    },
    {
      type: "number",
      id: "budgetTotal",
      label: "What's your total budget for this trip?",
      name: "budgetTotal",
    },
    {
      type: "select",
      id: "homeCurrency",
      label: "Please select the currency of the country you live in.",
      name: "homeCurrency",
      choose: true,
      options: currencies,
      value: currencies[0].value,
    },
  ],
  secondaryForm: [
    {
      type: "number",
      id: "budgetHotel",
      name: "budgetHotel",
      label: "Hotels",
    },
    {
      type: "number",
      id: "budgetFood",
      name: "budgetFood",
      label: "Food",
    },
    {
      type: "number",
      id: "budgetTransport",
      name: "budgetTransport",
      label: "Transport",
    },
    {
      type: "number",
      id: "budgetActivities",
      name: "budgetActivities",
      label: "Activities",
    },
    {
      type: "number",
      id: "budgetOther",
      name: "budgetOther",
      label: "Other",
    },
  ],
  submit: [
    {
      type: "button",
      id: "onboardingFormSubmit",
      label: "Great, you're all set! Let's visit your dashboard >",
    },
  ],
};
