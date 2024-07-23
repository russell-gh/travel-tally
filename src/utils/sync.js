import axios from "axios";

export async function addExpenseRemotely(payload) {
    if(payload.element) {
        payload.expense = payload.element;
        delete payload.element;
    }
    console.log(payload)
     const results = await axios.post("http://127.0.0.1:6001/expenses", payload)
      console.log(results);
}

export async function addSplitRemotely(payload) {
    console.log("PAYLOAD", payload)
    if(payload.element) {
        payload.billSplit = payload.element;
        delete payload.element;
    }
    console.log(payload)
     const results = await axios.post("http://127.0.0.1:6001/splits", payload)
      console.log(results);
}