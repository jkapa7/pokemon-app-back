const server = require("./src/app.js");

//REQUIERO MI BASE DE DATOS
const { conn } = require("./src/db.js");

const port = process.env.PORT || 3001;

//SINCRONIZO MI BASE DE DATOS LO QUE ME DEVULEVE UNA PROMESA
//EN EL MANEJADOR LEVANTO MI SERVIDOR
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log("Listening at" + " " + port); // eslint-disable-line no-console
  });
});
