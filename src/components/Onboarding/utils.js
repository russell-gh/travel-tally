export const toPennies = (val) => {
  return val * 100;
};

export const stringToTimestamp = (date) => {
    let _date = date.split("-");
    _date = new Date(date[0], date[1]-1, date[2])
    const timestamp = _date.getTime()

    return timestamp;
}