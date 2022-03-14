require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios");
const { Recipe, Diet } = require("../db");

const router = Router();

// GET /recipes?name="..."
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

const apiRecipes = async () => {
  try {
    const json = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    );
    const recipe = json.data.results?.map((r) => {
      return {
        id: r.id,
        image: r.image,
        name: r.title,
        diet: r.diets,
        score: r.spoonacularScore,
        summary: r.summary,
        time: r.readyInMinutes,
      };
    });
    // console.log("recipe", recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
};

const dbRecipes = async () => {
  try {
    const db = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const findRecipe = db.map((n) => ({
      id: n.id,
      image: n.image,
      name: n.name,
      diet: n.diets.map((d) => d.name),
      score: n.score,
      summary: n.summary,
      createdByUser: n.createdByUser,
    }));
    return findRecipe;
  } catch (error) {
    console.log(error);
  }
};

const allRecipes = async () => {
  try {
    const api = await apiRecipes();
    const db = await dbRecipes();
    const all = [...api, ...db];
    return all;
  } catch (error) {
    console.log(error);
  }
};

const apiName = async (name) => {
  try {
    return await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
      )
      .then((res) => {
        const names = res.data.results.map((r) => {
          return {
            id: r.id,
            image: r.image,
            name: r.title,
            diet: r.diets,
            score: r.spoonacularScore,
            summary: r.summary,
          };
        });
        // console.log("namesss", names);
        return names.filter((n) =>
          n.name.toLowerCase().includes(name.toLowerCase())
        );
      });
  } catch (error) {
    console.log(error);
  }
};

const dbName = async (name) => {
  // console.log("pato", name);
  try {
    const names = await Recipe.findAll({
      where: { name: { [Op.iLike]: "%" + name + "%" } },
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const dbNames = names.map((n) => ({
      id: n.id,
      image: n.image,
      name: n.name,
      diet: n.diets.map((d) => d.name),
      score: n.score,
      summary: n.summary,
      createdByUser: n.createdByUser,
    }));
    return dbNames;
  } catch (error) {
    console.log(error);
  }
};

const allNames = async (name) => {
  try {
    const api = await apiName(name);
    const db = await dbName(name);
    const all = api.concat(db);
    return all;
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const totalRecipes = await allRecipes();
    if (!name) {
      return res.send(totalRecipes);
    } else if (name) {
      const totalNames = await allNames(name);
      return res.send(totalNames);
    } else {
      return res.status(404).json({ msg: "Recipe Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

const apiId = async (id) => {
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
    );
    const detail = api.data;
    return {
      id: id,
      image: detail.image,
      name: detail.title,
      diet: detail.diets,
      summary: detail.summary,
      score: detail.spoonacularScore,
      healthScore: detail.healthScore,
      instructions: detail.instructions,
    };
  } catch (error) {
    console.log(error);
  }
};

const dbId = async (id) => {
  try {
    const idDb = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return {
      id: id,
      image: idDb.image,
      name: idDb.name,
      score: idDb.score,
      summary: idDb.summary,
      healthScore: idDb.healthScore,
      instructions: idDb.instructions,
      createdByUser: idDb.createdByUser,
      diet: idDb.diets.map((d) => d.name),
    };
  } catch (error) {
    console.log(error);
  }
};

const allIds = async (id) => {
  // console.log("manzana", id);
  try {
    if (id.includes("-")) {
      const db = await dbId(id);
      return db;
    }
    const api = await apiId(id);
    return api;
  } catch (error) {
    console.log(error);
  }
};

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ids = await allIds(id);
    if (ids) {
      return res.send(ids);
    } else {
      return res.status(404).json({ msg: "ID Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
