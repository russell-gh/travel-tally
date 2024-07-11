import React from 'react';
import { stringToTimestamp, generateId } from "../components/onboarding/utils";

export function splitExpenseBill(splitData, expense) {

    console.log(splitData, expense, 'inside split bill')
    let allSplits = [];

    splitData.forEach(bill => {
        const copy = {
            ...bill,
            expenseID: expense.id,
            id: generateId('billSplit'),
            description: expense.description,
            date: expense.date,
            totalExpense: expense.amount.fromValue,
            currency: expense.amount.fromCurrency, 
        }
        allSplits.push(copy);
        console.log(allSplits, 'BILLSPLIT ARRAY');
    });
   
  }