const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants () {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

function writeRestaurants(restaurantsArr) {
  fs.writeFileSync(filePath, JSON.stringify(restaurantsArr));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  writeRestaurants: writeRestaurants
}
