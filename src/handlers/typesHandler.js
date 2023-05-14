const { getAllTypes } = require("../controllers/typeController");

const typesHandler = async (req, res) => {
  //Llama a la funcion que obtiene los datos de la BDD,
  //Llama a la funcion que obtiene los datos de la API externa
  //Unir los datos, unificando el formato
  //Cuando tenga los datos responder
  try {
    const allTypes = await getAllTypes();

    res.status(200).json(allTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = typesHandler;
