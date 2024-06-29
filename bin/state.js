// What would the state look like?
state.budget = [
  {
    expenses: [
      {
        expenseId: 1,
        amount: { amount: 20, currency: "Euro", homeCurrency: 25 },
        category: "food", //choose from food, hotel, transport, activities and other
        currency: "Euro",
        description: "lunch", //can the person also leave empty
        date: "unixCode?",
        completed: true, // if false put in date for when??
        splitBill: false, // if true other things need to happen
      },
      {
        expenseId: 2,
        amount: 50,
        category: "activity",
        currency: "Euro",
        description: "musical",
        date: "unixCode?",
        homeCurrency: 60,
        completed: true,
        splitBill: false,
      },
    ],
  },
];

state.loginLogout = [];

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
