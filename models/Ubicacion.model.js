const sql = require("./db.js");

// constructor
const Ubicacion = function(ubicacion) {
  this.idUbicacion = ubicacion.idUbicacion;
  this.direccion = ubicacion.direccion;
};

Ubicacion.getCount = (result) => {
  sql.query("SELECT COUNT(*) as total FROM Ubicacion", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0].total);
  });
};

Ubicacion.create = (newUbicacion, result) => {
  sql.query("INSERT INTO Ubicacion SET ?", newUbicacion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Se creó ubicacion: ", newUbicacion);
    result(null, newUbicacion);
  });
};

Ubicacion.findById = (id, result) => {
  sql.query(`SELECT * FROM Ubicacion WHERE idUbicacion = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Se encontró ubicacion: ", res[0]);
      result(null, res[0]);
      return;
    }
    // No se encontró con el id
    result({ kind: "not_found" }, null);
  });
};

Ubicacion.getAll = (title, result) => {
  let query = "SELECT * FROM Ubicacion";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Ubicacion: ", res);
    result(null, res);
  });
};

Ubicacion.updateById = (id, ubicacion, result) => {
  sql.query(
    "UPDATE Ubicacion SET direccion = ? WHERE idUbicacion = ?",
    [ubicacion.direccion, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // No se encontró con el id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Se actualizó ubicacion: ", { id: id, ...ubicacion });
      result(null, { id: id, ...ubicacion });
    }
  );
};

Ubicacion.remove = (id, result) => {
  sql.query("DELETE FROM Ubicacion WHERE idUbicacion = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // No se encontró con el id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Se borró ubicacion con el id: ", id);
    result(null, res);
  });
};

module.exports = Ubicacion;