const app = require('express')();
const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const PORT = 8080;
const url = require('url');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/clientes.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
});

// Setting variable for sql queries
let sql;

app.use(bodyParser.json());

// Starting server
app.listen(
  PORT,
  () => console.log(`it's alive on http://localhost:${PORT}`)
);

// GET request to get all clients
app.get('/clients', (req, res) => {
  sql = "SELECT * FROM clientes";
  try {
    const queryObject = url.parse(req.url, true).query; // query parameters
    if (queryObject.field && queryObject.value) sql += ` WHERE ${queryObject.field} LIKE '%${queryObject.value}%'`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.json({
          status: 400,
          success: false,
          error: err.message,
        });
      }

      if (rows.length < 1) {
        return res.json({
          status: 200,
          success: true,
          error: "No hay clientes",
        });
      }

      return res.json({ status: 200, success: true, data: rows });

    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

// POST request to add clients to de DDBB
app.post('/clients', (req, res) => {
  try {
    const { nombre, apellido, edad, telefono, email, direccion, ciudad, estado, pais } = req.body;
    sql = "INSERT INTO clientes (nombre, apellido, edad, telefono, email, direccion, ciudad, estado, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.run(sql, [nombre, apellido, edad, telefono, email, direccion, ciudad, estado, pais], (err) => {
      if (err) {
        return res.json({
          status: 400,
          success: false,
          error: err.message,
        });
      }
    });

    console.log("Successful input", req.body);
    res.json({
      status: 200,
      success: true,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});
