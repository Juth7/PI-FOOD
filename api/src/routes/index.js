const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require("./recipes.js");
const recipe = require("./recipe.js");
const diets = require("./diets.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipes);
router.use("/recipe", recipe);
router.use("/types", diets);

module.exports = router;
