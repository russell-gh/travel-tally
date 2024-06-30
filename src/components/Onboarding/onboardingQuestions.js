import { currencyCodes } from "./dummyCurrencyCodes.js"; //change dummy to get from api + sort to get big 3 at top

let currencies = [];

for (const key of Object.keys(currencyCodes)) {
  currencies.push({ value: key, name: key });
}
console.log(currencies[7].value)
export const onboardingQuestions = [
  {
    type: "text",
    id: "destination",
    label: "Where are you off to?",
    name: "destination",
  },
  {
    type: "date",
    id: "startDate",
    label: "Choose the start date of your trip.",
    name: "startDate",
  },
  {
    type: "date",
    id: "endDate",
    label: "Choose the end date of your trip.",
    name: "endDate",
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
    options: currencies,
    defaultValue: currencies[0].value
  },
  {
    type: "button",
    id: "onboardingFormSubmit",
    label: "Let's move on to breaking down your budget >",
  },
];
