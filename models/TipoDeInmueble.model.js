const sql = require("./db.js");

// Constructor
const TipoDeInmueble = function(tipodeinmueble) {
  this.tipo = tipodeinmueble.tipo;
};

TipoDeInmueble.getCount = (result) => {
  sql.query("SELECT COUNT(*) as total FROM TipoDeInmueble", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0].total);
  });
};

TipoDeInmueble.create = (newTipoDeInmueble, result) => {
  sql.query("INSERT INTO TipoDeInmueble SET ?", newTipoDeInmueble, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Se creó el tipo de inmueble: ", newTipoDeInmueble);
    result(null, newTipoDeInmueble);
  });
};

TipoDeInmueble.findById = (id, result) => {
  sql.query(`SELECT * FROM TipoDeInmueble WHERE idTipoDeInmueble = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Se encontró tipo de inmueble: ", res[0]);
      result(null, res[0]);
      return;
    }
    // No se encontró con el id
    result({ kind: "not_found" }, null);
  });
};

TipoDeInmueble.getAll = (title, result) => {
  let query = "SELECT * FROM TipoDeInmueble";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("TipoDeInmueble: ", res);
    result(null, res);
  });
};

TipoDeInmueble.updateById = (id, tipo, result) => {
  sql.query(
    "UPDATE TipoDeInmueble SET tipo = ? WHERE idTipoDeInmueble = ?",
    [tipodeinmueble.tipo, id],
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
      console.log("Se actualizó tipo de inmueble: ", { id: id, ...tipodeinmueble });
      result(null, { id: id, ...tipodeinmueble });
    }
  );
};

TipoDeInmueble.remove = (id, result) => {
  sql.query("DELETE FROM TipoDeInmueble WHERE idTipoDeInmueble = ?", id, (err, res) => {
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
    console.log("Se borró tipo de inmueble con el id: ", id);
    result(null, res);
  });
};

module.exports = TipoDeInmueble;
