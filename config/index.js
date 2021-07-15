const ConfigOptions = require('./credentials.js');
function get(name) {
  const splitString = name.split('.');
  let obj = ConfigOptions;
  for(let key in splitString) {
    if (Object.prototype.hasOwnProperty.call(splitString, key)) {
      obj = obj[splitString[key]];
    }
  }
  return obj;
}
module.exports = {
  get: get
};
