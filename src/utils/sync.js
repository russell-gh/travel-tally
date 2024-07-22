import axios from "axios";

export async function addExpenseRemotely(payload) {
     const results = await axios.post("http://127.0.0.1:6001/expenses", payload)
      console.log(results);
}