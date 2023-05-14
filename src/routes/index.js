const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require("./pokemonsRouter");
const typesRouter = require("./typesRouter");

const router = Router();

// Configurar los routers.
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemon", pokemonRouter);
router.use("/types", typesRouter);

module.exports = router;
