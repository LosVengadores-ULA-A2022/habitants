const express = require("express");

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación de los vengadores." });
});

require("./routes/Persona.routes.js")(app);
require("./routes/Ubicacion.routes.js")(app);
require("./routes/TipoDeInmueble.routes.js")(app);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
