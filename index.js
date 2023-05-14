const server = require("./src/app.js");

//REQUIERO MI BASE DE DATOS
const { conn } = require("./src/db.js");

//SINCRONIZO MI BASE DE DATOS LO QUE ME DEVULEVE UNA PROMESA
//EN EL MANEJADOR LEVANTO MI SERVIDOR
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("Listening at 3001"); // eslint-disable-line no-console
  });
});
