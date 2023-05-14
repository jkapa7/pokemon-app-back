const axios = require("axios");

//ME IMPORTO EL MODELO DE LA BASE DE DATOS
const { Type } = require("../db");

const getAllTypes = async () => {
  //BUSCAR EN API, HAGO UNA PETICION A LA API
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type");

  const types = await typesApi.data;

  for (type of types.results) {
    //busco en la DB y corroboro si matchea algun type de la APi con la DB, cuando encuentre el primero me lo guardo
    const find = await Type.findOne({ where: { name: type.name } });
    //Si no encuetra...
    if (!find) {
      //Los crea todos en la DB
      //FALTA MANEJAR EL ERROR//
      await Type.create({ name: type.name });
    }
  }
  return await Type.findAll();
};

module.exports = { getAllTypes };
