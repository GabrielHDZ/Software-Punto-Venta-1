const express = require("express");
const router = express.Router();
const pool_mysql = require("../conexion_mysql");

router.get("/", async (_, res) => {
  try {
    const connection = await pool_mysql.getConnection();
    console.log("Conexión a la base de datos establecida");
    await connection.release();
    const [rows, _] = await connection.execute("SELECT * FROM cliente");
    res.json(rows);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
});

router.post("/", async function (req, res) {
  const data = Object.values(req.body);
  try {
    const connection = await pool_mysql.getConnection();
    console.log("Conexión a la base de datos establecida");
    await connection.release();
    const sql =
      "INSERT INTO `cliente`(`id_cliente`,`nombre`,`apellido`,`direccion`,`telefono`,`email`) VALUES (?,?,?,?,?,?)";
    const values = [null, ...data];
    const [result, fields] = await connection.execute(sql, values);
    console.log(result);

    res.json(result.serverStatus);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
