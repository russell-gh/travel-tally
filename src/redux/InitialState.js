import BillSplits from "../components/dashboard/BillSplits";

export const initialState = {
  trips: [],
  popUp: {},
  filter: "Show All",
  order: "Newest first",
  filterDate: "All Dates",
  splitData: [],
  splitMax: 0,
  splitValues: {values:[], remaining: 999},
  hideFutureExpenses: false,
  hidePaidSplitBills: false,
  showBillSplits: false,
};
