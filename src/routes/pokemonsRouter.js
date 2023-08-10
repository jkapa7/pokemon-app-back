const { Router } = require("express");
const validateCreatePokemon = require("../middleware/validateCreatePokemon");

const { pokemonsHandler } = require("../handlers");

const pokemonRouter = Router();

pokemonRouter.get("/", pokemonsHandler.pokemonsHandler);
pokemonRouter.get("/:id", pokemonsHandler.pokemonHandler);
pokemonRouter.post(
  "/",
  validateCreatePokemon,
  pokemonsHandler.createPokemonHandler
);

module.exports = pokemonRouter;
