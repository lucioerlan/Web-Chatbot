const moment = require('moment-timezone');

/**
 * Date and time now, time zone, formatted
 * @function datetimeNow
 */

const datetimeNow = () => {
  const now = moment().tz('America/Sao_Paulo');

  return {
    timeNow: now.format('YYYYMMDDHHmmssSSS') / 2,
  };
};

module.exports = {
  datetimeNow,
};
