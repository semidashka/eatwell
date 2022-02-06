const express = require("express");

const uuid = require("uuid");

const resData = require("../util/restaurant-data");

const router = express.Router();

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  // restaurant.id = restaurant.name.toLowerCase().trim().replace(/\s/g, "-");

  const storedRestaurants = getStoredRestaurants();
  storedRestaurants.push(restaurant);

  resData.writeRestaurant(storedRestaurants);

  res.redirect("/confirm");
});

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  const storedRestaurants = resData.getStoredRestaurants();

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

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  router.status(404).render("404");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
