module.exports = app => {
  const TipoDeInmueble = require("../controllers/TipoDeInmueble.controller.js");
  var router = require("express").Router();
  // Crear un nuevo tipo de inmueble
  router.post("/", TipoDeInmueble.create);
  // Obtiene todos los tipos de inmueble
  router.get("/", TipoDeInmueble.findAll);
  // Obtiene un tipo de inmueble por su id
  router.get("/:id", TipoDeInmueble.findOne);
  // Actualiza un tipo de inmueble por su id
  router.put("/:id", TipoDeInmueble.update);
  // Borra a un tipo de inmueble por su id
  router.delete("/:id", TipoDeInmueble.delete);
  app.use('/api/tipodeinmueble', router);
};
