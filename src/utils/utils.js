import { unixToDate } from "./utilsDates";
import dayjs from "dayjs";
import { colors } from "./config";
import { nanoid } from "nanoid";


export function getIndex(data, id, key) {
  const indexOf = data.findIndex((item) => {
    return item[key] === id;
  });

  if (indexOf === -1) {
    console.log("something went wrong getting the index");
    return;
  }

  return indexOf;
}

export function findItem(data, id) {
  const item = data.find((item) => {
    return item.id === id;
  });

  if (!item) {
    console.log("something went wrong getting the item");
    return;
  }

  return item;
}

export const getColourForSharedId = (arrSharedId, sharedId) => {
  if (arrSharedId.length === 0 || !arrSharedId) {
    return;
  } else {
    const indexOf = arrSharedId.indexOf(sharedId);
    return colors[indexOf];
  }
};

export function getArrayOfValues(data, key, hideFutureExpenses) {
  let copy = [...data];

  //hides future dates if checked
  if (key === "startDate" && hideFutureExpenses === true) {
    copy = copy.filter((item) => {
      return dayjs(item.startDate).isBefore(dayjs());
    });
  }
  //makes an array of the dates
  copy = copy.map((item) => {
    return item[key];
  });

  // removes duplicates
  copy = [...new Set(copy)];

  if (key === "startDate") {
    // get dates in right order
    copy.sort((a, b) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      }
      return 0;
    });

    // turns unixCode to timestamp
    copy = copy.map((item) => {
      return unixToDate(item);
    });

    //add All Dates as first element
    copy.unshift("All Dates");
  }

  return copy;
}

export const toPennies = (val) => {
  return val * 100;
};

export const stringToUnix = (date) => {
  let _date = date.split("-");
  _date = new Date(_date[0], _date[1] - 1, _date[2]);

  return _date.getTime();
};

//send type as string (e.g. "trip", "user", expenses")
export const generateId = (type) => {
  return `_${type}_${nanoid()}`;
};
