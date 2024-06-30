state.holiday = [
  {
    travelInfo: {
      budgetTotal: 1400,
      budgetHotel: 500,
      budgetFood: 300,
      budgetTransport: 200,
      budgetActivities: 400,
      budgetOther: 0,
      homeCurrency: "pounds",
      destination: "Thailand",
      startDate: "unixCode",
      endDate: "unixCode",
      // Do we want budget per day in here as well?
    },
  },
];

now major:
add all options for currencies
validation
make them controlled components?
Display effects: Once all form inputs have passed validation, submit button is displayed, On submit of form, budget breakdown component is displayed

now minor: 
Display total budget from store which auto-updates as user types to display remaining budget
edit date format and number format

later:
Can they tab through?
Automatically focus on display of component
Add geolocation to autodetect home country?
fix selected/defaultValue bug
Speak to Sacha about when to convert date
check if callback syntax is correct?

use api for countries


