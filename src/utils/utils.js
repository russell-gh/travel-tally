import { unixToDate } from "./utilsDates";

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

// array with colors we like for the app (need to adjust for our colourpallette, need to move to utils and import)
export const colors = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
];

export const getColourForSharedId = (arrSharedId, sharedId) => {
  if (arrSharedId.length === 0 || !arrSharedId) {
    return;
  } else {
    const indexOf = arrSharedId.indexOf(sharedId);
    return colors[indexOf];
  }
};

export function getArrayOfValues(data, key) {
  let copy = [...data];
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
