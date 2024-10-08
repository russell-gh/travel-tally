import React from "react";
import { generateId } from "./utils";

export function splitExpenseBill(splitData, expense) {
  if (!splitData) {
    return;
  }
  // console.log(splitData, "IN SPLIT");
  let allSplits = [];

  splitData.forEach((bill) => {
    if (!bill.paid) {
      bill.paid = false;
    }
    if (!bill.converted) {
      bill.converted = bill.amount;
    }

    let newAmount = {
      fromValue: Number(bill.amount),
      toValue: Number(bill.converted),
      fromCurrency: expense.amount.fromCurrency,
      toCurrency: expense.amount.toCurrency,
    };

    // console.log(expense);

    const formatted = {
      amount: newAmount,
      name: bill.name,
      paid: bill.paid,
      expenseId: expense.id,
      ...(expense.sharedId ? { sharedId: expense.sharedId } : {}),
      id: generateId("billSplit"),
      description: expense.description,
      date: expense.date,
    };
    allSplits.push(formatted);
  });

  // console.log(allSplits, "END SPLIT");

  return allSplits;
}

export function splitMultiExpenseBill(splits, multiExpenses, days) {
  if (!splits || !multiExpenses || !days) {
    // console.log("something went wrong with the multiday billsplits");
    return;
  }

  let allSplits = [];

  for (const expense of multiExpenses) {
    // console.log(expense);
    for (const split of splits) {
      if (!split.converted) {
        split.converted = split.amount;
      }

      let newAmount = {
        fromValue: Number(split.amount / days),
        toValue: Number(split.converted / days),
        fromCurrency: expense.amount.fromCurrency,
        toCurrency: expense.amount.toCurrency,
      };

      const formatted = {
        amount: newAmount,
        name: split.name,
        paid: split.paid,
        expenseId: expense.id,
        sharedId: expense.sharedId,
        id: generateId("billSplit"),
        description: expense.description,
        date: expense.date,
      };
      allSplits.push(formatted);
    }
  }
  // console.log(allSplits);

  return allSplits;
}
