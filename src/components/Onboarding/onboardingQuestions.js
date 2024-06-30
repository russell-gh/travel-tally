export const onboardingQuestions =
  [
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
        options:[
          { value: "GBP", name: "Great British Pounds"},
          { value: "EUR", name: "Euros" },
          { value: "USD", name: "United States Dollars" },
        ]
      },
    {                                                    
        type: "button",
        id: "onboardingFormSubmit",
        label:"Let's move on to breaking down your budget >"
      }]