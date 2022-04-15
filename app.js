const express = require("express");
const mysql_connector = require('mysql2');
const util = require('util');

const connection = mysql_connector.createConnection({
    host: 'school-db',
    user: 'root',
    password: '123456',
    database: 'school-db'
});

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.get("/", (req, res) => {
    connection.connect();
    connection.query("SELECT VERSION()", function(error, results){
        console.log("query response is ", results);
        console.log("query error is ", error);
        res.json(results);
    })
    connection.end()
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});