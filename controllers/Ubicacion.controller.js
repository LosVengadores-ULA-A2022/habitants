const Ubicacion = require("../models/Ubicacion.model.js");

// Crea y guarda una nueva ubicacion
exports.create = (req, res) => {
  // Valida la petición
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Ubicacion.getCount((err, count) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting the Ubicacion."
      });
    else {
      // Crea una ubicacion
      const ubicacion = new Ubicacion({
        idUbicacion: count + 1,
        direccion: req.body.direccion,
      });

      // Guarda la ubicacion en la base de datos
      Ubicacion.create(ubicacion, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Ubicacion."
          });
        else res.send(data);
      });
    }
  })
};

// Obtiene todas las ubicaciones de la base de datos
exports.findAll = (req, res) => {
  const title = req.query.title;
  Ubicacion.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ubicacions."
      });
    else res.send(data);
  });
};

// Obtiene a una sola ubicacion por su id
exports.findOne = (req, res) => {
  Ubicacion.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ubicacion with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Ubicacion with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualiza a una ubicacion por su id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req);

  Ubicacion.updateById(
    req.params.id,
    new Ubicacion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ubicacion with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ubicacion with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Borra a una ubicacion por su id
exports.delete = (req, res) => {
  Ubicacion.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ubicacion with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ubicacion with id " + req.params.id
        });
      }
    } else res.send({ message: `Ubicacion was deleted successfully!` });
  });
};
