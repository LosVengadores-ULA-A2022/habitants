const TipoDeInmueble = require("../models/TipoDeInmueble.model.js");

// Crea y guarda un tipo de inmueble
exports.create = (req, res) => {
  // Valida la petición
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  TipoDeInmueble.getCount((err, count) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting the TipoDeInmueble."
      });
    else {
      // Crea un tipo de inmueble
      const tipodeinmueble = new TipoDeInmueble({
        idTipoDeInmueble: count + 1,
        tipo: req.body.tipo,
      });

      // Guarda el tipo de inmueble en la base de datos
      TipoDeInmueble.create(tipodeinmueble, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the tipo de inmueble."
          });
        else res.send(data);
      });
    }
  })
};

// Obtiene los tipos de inmueble de la base de datos
exports.findAll = (req, res) => {
  const title = req.query.title;
  TipoDeInmueble.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tipo de inmueble."
      });
    else res.send(data);
  });
};

// Obtiene el tipo de inmueble por su id
exports.findOne = (req, res) => {
  TipoDeInmueble.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TipoDeInmueble with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TipoDeInmueble with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualiza un tipo de inmueble por su id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req);

  TipoDeInmueble.updateById(
    req.params.id,
    new TipoDeInmueble(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TipoDeInmueble with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating tipodeinmueble with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Borra un tipo de inmueble por su id
exports.delete = (req, res) => {
  TipoDeInmueble.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TipoDeInmueble with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete TipoDeInmueble with id " + req.params.id
        });
      }
    } else res.send({ message: `TipoDeInmueble was deleted successfully!` });
  });
};
