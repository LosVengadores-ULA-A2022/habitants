const sql = require("./db.js");

// constructor
const Persona = function(persona) {
  this.title = persona.title;
  this.description = persona.description;
  this.published = persona.published;
};

Persona.create = (newPersona, result) => {
  sql.query("INSERT INTO Persona SET ?", newPersona, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Se creó persona: ", { id: res.insertId, ...newPersona });
    result(null, { id: res.insertId, ...newPersona });
  });
};

Persona.findById = (id, result) => {
  sql.query(`SELECT * FROM Persona WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Se encontró persona: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found persona with the id
    result({ kind: "not_found" }, null);
  });
};

Persona.getAll = (title, result) => {
  let query = "SELECT * FROM Persona";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Persona: ", res);
    result(null, res);
  });
};

Persona.updateById = (id, persona, result) => {
  sql.query(
    "UPDATE Persona SET title = ?, description = ?, published = ? WHERE id = ?",
    [persona.title, persona.description, persona.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found persona with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Se actualizó persona: ", { id: id, ...persona });
      result(null, { id: id, ...persona });
    }
  );
};

Persona.remove = (id, result) => {
  sql.query("DELETE FROM Persona WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found persona with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Se borró persona con el id: ", id);
    result(null, res);
  });
};

module.exports = Persona;