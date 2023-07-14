const { getAllTypes } = require("../controllers/typeController");
const { response, catchedAsync } = require("../utils");

const typesHandler = async (req, res) => {
  const allTypes = await getAllTypes();
  response(res, 200, allTypes);
};

module.exports = {
  typesHandler: catchedAsync(typesHandler),
};
