const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { ClientError } = require("../utils");

const getAllPokemons = async () => {
  const databasePokemon = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
    },
  });

  const dataDb = databasePokemon.map((poke) => ({
    ...poke.toJSON(),
    types: poke.types.map((t) => t.name),
  }));

  const apiPokemonPage1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const apiPokemonPage2 = await axios.get(apiPokemonPage1.data.next);

  const apiPokemonRaw = [
    ...apiPokemonPage1.data.results,
    ...apiPokemonPage2.data.results,
  ];

  const apiPokemonFiltered = await Promise.all(
    apiPokemonRaw.map(async (pokemon) => {
      let pokemonUrl = await axios.get(pokemon.url);
      return {
        id: pokemonUrl.data.id,
        name: pokemonUrl.data.name,
        types: pokemonUrl.data.types.map((slot) => slot.type.name),
        image: pokemonUrl.data.sprites.front_default,
        life: pokemonUrl.data.stats[0].base_stat,
        attack: pokemonUrl.data.stats[1].base_stat,
        defense: pokemonUrl.data.stats[2].base_stat,
        speed: pokemonUrl.data.stats[5].base_stat,
        height: pokemonUrl.data.height,
        weight: pokemonUrl.data.weight,
        createdDb: pokemonUrl.data.createdDb,
      };
    })
  );
  const results = [...dataDb, ...apiPokemonFiltered];
  return results;
};

const getPokemonByName = async (name) => {
  const allPokemons = await getAllPokemons();
  const pokemonByName = allPokemons.filter(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );
  if (pokemonByName.length === 0) throw new Error(`Pokemon ${name} not found`);
  return pokemonByName;
};

const getPokemonById = async (id) => {
  const allPokemons = await getAllPokemons();
  const pokemonById = allPokemons.find(
    (pokemon) => pokemon.id === id || pokemon.id === Number(id)
  );
  if (!pokemonById) throw new Error(`Pokemon with id: ${id} not found`);
  return pokemonById;
};

const createPokemon = async (
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  if (!name || !life || !attack || !defense || !types) {
    throw new Error("Please complete the required information.");
  }
  let newPokemon = await Pokemon.create({
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  types.forEach(async (tp) => {
    let pokemonType = await Type.findOne({ where: { name: tp } });
    await newPokemon.addType(pokemonType);
  });

  return newPokemon;
};

module.exports = {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  getPokemonByName,
};
