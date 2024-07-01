export const getSortedandFiltered = (data, order, filter, filterDate) => {
  let filtered = [...data];

  // select
  switch (order) {
    case "Newest first":
      break;
    case "Price: high to low":
      filtered.sort((a, b) => {
        if (a.amount.amount < b.amount.amount) {
          return 1;
        } else if (a.amount.amount > b.amount.amount) {
          return -1;
        }
        return 0;
      });
      break;
    case "Price: low to high":
      filtered.sort((a, b) => {
        if (a.amount.amount > b.amount.amount) {
          return 1;
        } else if (a.amount.amount < b.amount.amount) {
          return -1;
        }
        return 0;
      });
      break;
    default:
      console.log("something went wrong with the sorting");
      break;
  }

  //filter
  switch (filter) {
    case "Show All":
      break;
    case "Activities":
    case "Food":
    case "Transport":
    case "Hotel":
    case "Other":
      filtered = filtered.filter((item) => {
        return item.category === filter;
      });
      break;
    default:
      console.log("something went wrong with the filtering");
      break;
  }

  //filterDate

  if (filterDate === "All Dates") {
    ("everything stays the same");
  } else {
    filtered = filtered.filter((item) => {
      return item.date === filterDate;
    });
    if (filtered.length === 0) {
      console.log("Something went wrong with filtering the date");
    }
  }

  return filtered;
};
