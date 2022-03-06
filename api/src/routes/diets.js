const { Router } = require("express");
const { Diet } = require("../db");

const router = Router();

const dietTypes = async () => {
  try {
    const prediets = await Diet.findAll();
    if (prediets.length) {
      return prediets;
    }
    const types = [
      "gluten free",
      "dairy free",
      "ketogenic",
      "vegetarian",
      "lacto vegetarian",
      "lacto ovo vegetarian",
      "ovo vegetarian",
      "vegan",
      "pescatarian",
      "paleolithic",
      "primal",
      "fodmap friendly",
      "whole 30",
    ];

    types.map(async (d) => {
      await Diet.findOrCreate({
        where: { name: d },
      });
    });
    return await Diet.findAll();
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res) => {
  try {
    const diets = await dietTypes();
    res.send(diets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
