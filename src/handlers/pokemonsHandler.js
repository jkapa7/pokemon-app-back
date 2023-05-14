const {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  getPokemonByName,
} = require("../controllers/pokemonController");

const pokemonsHandler = async (req, res) => {
  //Llama a la funcion que obtiene los datos de la BDD,
  //Llama a la funcion que obtiene los datos de la API
  //Unir los datos, unificando el formato
  const { name } = req.query;

  try {
    const results = name
      ? await getPokemonByName(name)
      : await getAllPokemons();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const pokemonHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemonById = await getPokemonById(id);
    res.status(200).json(pokemonById);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  //ESTOS SON LOS VALORES NECESARIOS PARA CREAR UN POKEMON Y
  //LOS RECIBO POR BODY
  try {
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

    res.status(200).json(newPokemon);
    res.status(201).send(`Pokemon ${name} created successfully!`);
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  pokemonHandler,
  pokemonsHandler,
  createPokemonHandler,
};
