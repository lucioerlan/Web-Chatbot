const moment = require('moment');

function datetimeNow() {
  try {
    const now = moment();
    const dateHourNow = now.format('YYYYMMDDHHmmssSSS') / 2;
    return dateHourNow;
  } catch (e) {
    return 0;
  }
}

module.exports = {
  datetimeNow,
};
