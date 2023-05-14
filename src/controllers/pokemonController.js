const axios = require("axios");

//ME IMPORTO EL MODELO CON EL QUE VOY A TRABAJAR DE LA BASE DE DATOS
const { Pokemon, Type } = require("../db");

const getAllPokemons = async () => {
  //BUSCO TODOS LOS POKEMONS EN MI BASE DE DATOS
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

  //BUSCO TODOS LOS POKEMONS EN MI API
  const apiPokemonPage1 = await axios.get("https://pokeapi.co/api/v2/pokemon");

  //COMO EL RESULTADO DE LA API MUESTRA UN NUMERO DE POKEMONES Y EN LA
  //PROPIEDAD NEXT UN LINK DONDE HAY MAS POKEMONES, HAGO UNA PETICION AHI
  const apiPokemonPage2 = await axios.get(apiPokemonPage1.data.next);
  // const apiPokemonPage3 = await axios.get(apiPokemonPage2.data.next);
  // const apiPokemonPage4 = await axios.get(apiPokemonPage3.data.next);

  const apiPokemonRaw = [
    ...apiPokemonPage1.data.results,
    ...apiPokemonPage2.data.results,
    // ...apiPokemonPage3.data.results,
    // ...apiPokemonPage4.data.results,
  ];

  //FILTRO LO QUE RECIBO DE LA API, ES UN ARRAY CON POKEMONS Y LO MAPEO PARA
  //RECIBIR LA URL DE CADA POKEMON DONDE ESTA LA INFORMACION QUE QUIERO,
  //ESA INFORMACION LA VUELVO A FILTRAR PARA OBTENER SOLO LO QUE NECESITO,
  //PROMISE.ALL TOMA UN ARRAY DE PROMESAS Y SE RESUELVE CUANDO TODAS LAS
  //PROMESAS SE HAYAN RESUELTO
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

  //UNIFICO LOS POKEMOS DE MI BASE DE DATOS Y LOS DE LA API
  const results = [...dataDb, ...apiPokemonFiltered];

  return results;
};

const getPokemonByName = async (name) => {
  //TENGO QUE BUSCAR EN BASE DE DATOS Y EN API
  //PERO YA HICE ESO ANTES, CUANDO LOS OBTENGO A TODOS, PUEDO REUTILIZAR ESE
  //CONTROLER Y FILTRARLO EN ESTE POR NOMBRE
  const allPokemons = await getAllPokemons();

  //FILTRO TODOS POR EL NAME, PODRIA UTILIZAR EL METODO FIND, QUE TAMBIEN
  //BUSCARIA Y AL ENCONTRAR CON LA CONDICION RETORNA Y TERMINA, PERO A DIFERENCIA
  //DEL ID QUE ES UNICO, PUEDO TENER VARIOS POKEMONES CON EL MISMO NOMBRE. ENTONCES
  //DEBO DEVOLVER UN ARRAY CON TODOS LOS POKEMONS QUE TENGAN ESE NOMBRE
  const pokemonByName = allPokemons.filter(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );

  //VALIDO SI EXISTE EL POKEMON, SI NO ARROJO UN ERROR
  if (pokemonByName.length === 0) throw new Error(`Pokemon ${name} not found`);

  return pokemonByName;
};

const getPokemonById = async (id) => {
  //SI ES API BUSCO EN LA API,
  //SI ES BASE DE DATOS BUSCO EN LA BDD
  //FILTRO LO QUE RECIBO PARA TENER SOLO LO QUE NECESITO
  //ESTO YA LO HICE CUANDO PIDO A TODOS, PUEDO REUTILIZAR ESE
  //CONTROLLER Y FILTRARLO POR NAME
  const allPokemons = await getAllPokemons();

  //EN ESTE CASO COMO EL ID ES UNICO Y NO SE REPITE, UTILIZO EL FIND, UNA VEZ
  //ENCUENTRE UN POKEMON CON EL ID LO RETORNA Y TERMINA LA EJECUCION, EVALUO DOS POSIBILIDADES
  //RECIBIR ID COMO UN NUMERO Y RECIBIR ID COMO UN STRING
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
  //ME PIDEN CIERTOS VALORES OBLIGATORIOS Y PARA ESO HAGO UNA VALIDACINO
  //DE LA INFORMACION QUE ME ESTAN PASANDO POR BODY, SI NO ESTA COMPLETA ARROJO UN ERROR
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
