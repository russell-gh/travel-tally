import { addDecimals } from "./utilsBudget";

export function getTotalSplitBills(splits, filter) {
  let filteredSplitsArray;
  let amountArray = [];

  //filter the splits to paid or unpaid
  if (filter === "paid") {
    filteredSplitsArray = splits.filter((split) => {
      return split.paid;
    });
  } else if (filter === "unpaid") {
    filteredSplitsArray = splits.filter((split) => {
      return !split.paid;
    });
  } else {
    // console.log("something went wrong with filtering the splits");
    return;
  }

  if (filteredSplitsArray.length === 0) {
    return 0;
  }

  // put the amounts into array
  filteredSplitsArray.forEach((split) => {
    amountArray.push(split.amount.toValue);
  });

  //add all of the amounts together
  let totalAmount = amountArray.reduce((acc, value) => {
    return acc + value;
  }, 0);

  return addDecimals(totalAmount);
}
