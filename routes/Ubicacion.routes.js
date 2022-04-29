module.exports = app => {
  const Ubicacion = require("../controllers/Ubicacion.controller.js");
  var router = require("express").Router();
  // Crear una nueva ubicacion
  router.post("/", Ubicacion.create);
  // Obtiene todas las ubicacions
  router.get("/", Ubicacion.findAll);
  // Obtiene una sola ubicacion por su id
  router.get("/:id", Ubicacion.findOne);
  // Actualiza una ubicacion por su id
  router.put("/:id", Ubicacion.update);
  // Borra a una ubicacion por su id
  router.delete("/:id", Ubicacion.delete);
  app.use('/api/ubicacion', router);
};