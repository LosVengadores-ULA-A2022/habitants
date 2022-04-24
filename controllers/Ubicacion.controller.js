const Ubicacion = require("../models/Ubicacion.model.js");

// Crea y guarda una nueva ubicacion
exports.create = (req, res) => {
  // Valida la petición
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!"
    });
  }

  // Crea una ubicacion
  const ubicacion = new Ubicacion({
    direccion: req.body.direccion,
  });

  // Guarda la ubicacion en la base de datos
  Ubicacion.create(ubicacion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrio un error creando la ubicacion."
      });
    else res.send(data);
  });
};

// Obtiene todas las ubicaciones de la base de datos
exports.findAll = (req, res) => {
  const direccion = req.query.direccion;
  Ubicacion.getAll(direccion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrio un error buscando la ubicacion."
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
          message: `No se encontro ubicacion con el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error buscando ubicacion con id " + req.params.id
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
      message: "El contenido no puede estar vacio!"
    });
  }

  Ubicacion.updateById(
    req.params.id,
    new Ubicacion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro ubicacion con el id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actualizando ubicacion con id " + req.params.id
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
          message: `No se encontro ubicacion con el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar la ubicacion con id " + req.params.id
        });
      }
    } else res.send({ message: `Ubicacion se borro exitosamente!` });
  });
};
