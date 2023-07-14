const {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  getPokemonByName,
} = require("../controllers/pokemonController");
const { catchedAsync, response } = require("../utils");

const pokemonsHandler = async (req, res) => {
  const { name } = req.query;
  const results = name ? await getPokemonByName(name) : await getAllPokemons();
  response(res, 200, results);
};

const pokemonHandler = async (req, res) => {
  const { id } = req.params;
  const pokemonById = await getPokemonById(id);
  response(res, 200, pokemonById);
};

const createPokemonHandler = async (req, res) => {
  const { name, image, life, attack, defense, speed, height, weight, types } =
    req.body;
  const newPokemon = await createPokemon(
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    types
  );
  response(res, 200, newPokemon);
};

module.exports = {
  pokemonHandler: catchedAsync(pokemonHandler),
  pokemonsHandler: catchedAsync(pokemonsHandler),
  createPokemonHandler: catchedAsync(createPokemonHandler),
};
