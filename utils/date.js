const moment = require('moment');

moment.locale('fr');

const getFromNow = (date) => moment().fromNow(date);

module.exports = {
  getFromNow,
};
