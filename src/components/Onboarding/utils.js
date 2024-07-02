export const toPennies = (val) => {
  return val * 100;
};

export const stringToTimestamp = (date) => {
  let _date = date.split("-");
  _date = new Date(_date[0], _date[1] - 1, _date[2]);

  return _date.getTime();
};

export const getCurrentTrip = (trips, id) => {
  const index = trips.findIndex((trip) => trip.id === id);

  return index;
};
