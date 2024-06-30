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

Major:
change hardcoded currencies to get from api. Get from Jack's call after merge
make them controlled components?
Display effects: Once all form inputs have passed validation, submit button is displayed, On submit of form, budget breakdown component is displayed
use api for countries and add search on input
Check if callback syntax is correct?

Minor: 
Display total budget from store which auto-updates as user types to display remaining budget
edit date format and number format
abstract validation and move to seperate folder

later:
Add auto-focus on load
Add geolocation to autodetect home country?
fix selected/defaultValue bug
Date conversion?



