const { Router } = require("express");
const validate = require("../middleware/validate");

const { pokemonsHandler } = require("../handlers");

const pokemonRouter = Router();

pokemonRouter.get("/", pokemonsHandler.pokemonsHandler);
pokemonRouter.get("/:id", pokemonsHandler.pokemonHandler);
pokemonRouter.post("/", validate, pokemonsHandler.createPokemonHandler);

module.exports = pokemonRouter;
