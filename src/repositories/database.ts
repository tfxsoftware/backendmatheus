import sqlite3 from "sqlite3";
const DBSOURCE = "db.sqlite";

/***
 * Atenção: não existe tipo boolean no banco SQLite.
 * Apenas devemos representar como inteiro
 * sendo: 0 => false e 1 => true.
 */
const DDL_SCRIPT = `
    CREATE TABLE contas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conta TEXT,
        agencia TEXT

    )`;
const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Database connected.");
    database.run(DDL_SCRIPT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table contas created.");
      }
    });
  }
});
export default database;
