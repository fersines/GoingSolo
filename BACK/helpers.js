const { format } = require("date-fns");

function formateDateToDB(dateObject) {
  return format(dateObject, "yyyy-MM-dd HH:mm:ss");
}

module.exports = {
  formateDateToDB,
};
