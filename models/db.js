const mysql_connector = require('mysql2');

const connection = mysql_connector.createConnection({
    host: 'school-db',
    user: 'root',
    password: '123456',
    database: 'school-db'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Conexion a la base de datos exitosa.");
});

module.exports = connection;