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
