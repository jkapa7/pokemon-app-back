const axios = require("axios");
const { Type } = require("../db");

const getAllTypes = async () => {
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
  const types = await typesApi.data;

  for (type of types.results) {
    const find = await Type.findOne({
      where: { name: type.name },
    });
    if (!find) {
      await Type.create({ name: type.name });
    }
  }

  return await Type.findAll();
};

module.exports = { getAllTypes };
