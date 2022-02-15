const express = require("express");

const uuid = require("uuid");

const resData = require("../util/restaurant-data");

const router = express.Router();

router.get('/restaurants', (req, res) => {
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const storedRestaurants = resData.getStoredRestas();
  storedRestaurants.sort((a, b) => {
    if (
      (order === "acs" && a.name > b.name) ||
      (order === "desc" && b.name > a.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

router.post('/restaurants', (req, res) => {

  resData.addToDataFile(req);
 
  res.json();
});
  

// router.get("/restaurants/:id", function (req, res) {
//   const restaurantId = req.params.id;
//   const storedRestaurants = resData.getStoredRestas();

//   for (const restaurant of storedRestaurants) {
//     if (restaurant.id === restaurantId) {
//       return res.json(restaurant);
//       // .render("restaurant-detail", { restaurant: restaurant });
//     }
//   }

//   router.status(404).render("404");
// });

router.get('/recommend', (req, res) => {
  res.render('recommend');
});

router.post('/recommend', (req, res) => {
  resData.addToDataFile(req);
  
  res.redirect('/confirm');
});

router.get("/confirm", (req, res) => {
  res.render("confirm");
});

module.exports = router;

