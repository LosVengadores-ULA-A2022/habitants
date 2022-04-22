module.exports = app => {
  const Persona = require("../controllers/Persona.controller.js");
  var router = require("express").Router();
  // Crear una nueva persona
  router.post("/", Persona.create);
  // Obtiene todas las personas
  router.get("/", Persona.findAll);
  // Obtiene una sola persona por su id
  router.get("/:id", Persona.findOne);
  // Actualiza una persona por su id
  router.put("/:id", Persona.update);
  // Borra a una persona por su id
  router.delete("/:id", Persona.delete);
  app.use('/api/persona', router);
};