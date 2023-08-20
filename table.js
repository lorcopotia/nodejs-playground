# Es requisito crear el fichero db/clientes.db antes de ejecutar este js.
# Con la ejecution de table.js creamos la estructura de la base de datos

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/clientes.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
});

const sql = `CREATE TABLE IF NOT EXISTS clientes (id INTEGER UNIQUE PRIMARY KEY, nombre VARCHAR, apellido VARCHAR, edad VARCHAR, telefono VARCHAR, email VARCHAR, direccion VARCHAR, ciudad VARCHAR, estado VARCHAR, pais VARCHAR)`;
db.run(sql);
