const Persona = require("../models/Persona.model.js");

// Crea y guarda una nueva persona
exports.create = (req, res) => {
  // Valida la petición
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Crea una persona
  const persona = new Persona({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Guarda la persona en la base de datos
  Persona.create(persona, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Persona."
      });
    else res.send(data);
  });
};

// Obtiene todas las personas de la base de datos
exports.findAll = (req, res) => {
  const title = req.query.title;
  Persona.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Personas."
      });
    else res.send(data);
  });
};

// Obtiene a una sola persona por su id
exports.findOne = (req, res) => {
  Persona.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Persona with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Persona with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualiza a una persona por su id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Persona.updateById(
    req.params.id,
    new Persona(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Persona with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating PErsona with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Borra a una persona por su id
exports.delete = (req, res) => {
  Persona.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Persona with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Persona with id " + req.params.id
        });
      }
    } else res.send({ message: `Persona was deleted successfully!` });
  });
};
