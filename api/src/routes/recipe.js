const axios = require("axios");
const { Router } = require("express");
const { Recipe, Diet } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      summary,
      score,
      healthScore,
      instructions,
      diets,
      createdByUser,
    } = req.body;
    const newRecipe = await Recipe.create({
      name,
      image: image || "../../client/src/img/404.png",
      summary,
      score,
      healthScore,
      instructions,
      createdByUser,
    });
    const diet = await Diet.findAll({
      where: { name: diets },
    });

    newRecipe.addDiet(diet);

    // return res.status(200).send("Recipe created succesfully!");
    return res.send(newRecipe);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
