const { Router } = require("express");
const validate = require("../middleware/validate");

const {
  pokemonHandler,
  pokemonsHandler,
  createPokemonHandler,
} = require("../handlers/pokemonsHandler");

const pokemonRouter = Router();

pokemonRouter.get("/", pokemonsHandler);
pokemonRouter.get("/:id", pokemonHandler);
pokemonRouter.post("/", validate, createPokemonHandler);

module.exports = pokemonRouter;
