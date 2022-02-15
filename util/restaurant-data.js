const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestas () {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

function addToDataFile (req) { 
  const restaurant = req.body;
  restaurant.id = restaurant.name.toLowerCase().trim().replace(/\s/g, "-");
  // restaurant.id = uuid.v4();

  const storedRestas = getStoredRestas();
  storedRestas.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestas));
}

module.exports = {
  getStoredRestas,
  addToDataFile
}
