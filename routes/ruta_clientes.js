const express = require("express");
const router = express.Router();
const pool_mysql = require("../conexion_mysql");

router.get("/", async (_, res) => {
  try {
    const connection = await pool_mysql.getConnection();
    await connection.release();
    const [rows, _] = await connection.execute("SELECT * FROM cliente");
    res.json(rows);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
});

router.post("/", async function (req, res) {
  try {
    const data = Object.values(req.body);
    const connection = await pool_mysql.getConnection();
    await connection.release();
    const sql =
      "INSERT INTO `cliente`(`id_cliente`,`nombre`,`apellido`,`direccion`,`telefono`,`email`) VALUES (?,?,?,?,?,?)";
    const values = [null, ...data];
    const [result, _] = await connection.execute(sql, values);
    console.log(result);
    res.json(result.serverStatus);
  } catch (err) {
    console.log(err);
  }
});

//localhost:3001/api/clientes/3?clave=12
router.delete("/:clave", async function (req, res) {
  /* console.log(req.params.id);
  console.log(req.query.clave); */
  try {
    const connection = await pool_mysql.getConnection();
    await connection.release();
    const call = "CALL EliminarCliente(?)";
    const values = [req.params.id];
    const [result, _] = await connection.execute(call, values);
    console.log(result);
    res.json({
      response: `${result.serverStatus}${result.warningStatus}${result.changedRows}`,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async function (req, res) {
  const data = Object.values(req.body);
  try {
    const connection = await pool_mysql.getConnection();
    await connection.release();
    const call = "CALL ACTUALIZAR_CLIENTE(?,?,?,?,?,?)";
    const values = [req.params.id, ...data];
    const [result, _] = await connection.execute(call, values);
    console.log(result);
    res.json({
      response: `${result.serverStatus}${result.warningStatus}${result.changedRows}`,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
