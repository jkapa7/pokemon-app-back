const server = require("./src/app.js");
const { conn, connectDb } = require("./src/db.js");
const { PORT } = process.env;

connectDb().then(() => {
  conn.sync({ force: true }).then(() => {
    server.listen(PORT || 3000, () => {
      console.log(`http://localhost:${PORT}`);
      console.log(`Listening at port ${PORT}`);
    });
  });
});
