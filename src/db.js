const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`;

const sequelize = new Sequelize(URL, {
  logging: false,
  native: false,
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    process.exit(1);
  }
};

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Pokemon, Type } = sequelize.models;

Pokemon.belongsToMany(Type, { through: "pokemon_type" });
Type.belongsToMany(Pokemon, { through: "pokemon_type" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  connectDb,
};
