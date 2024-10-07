const express = require("express");
const router = express.Router();
const pool_mysql = require("../conexion_mysql");

router.get("/", async (_, res) => {
  try {
    const connection = await pool_mysql.getConnection();
    await connection.release();
    const [rows, _] = await connection.execute("SELECT * FROM producto");
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
      "INSERT INTO `producto`(`id_producto`,`nombre`,`descripcion`,`precio_unitario`,`stock_minimo`) VALUES (?,?,?,?,?)";
    const values = [null, ...data];
    const [result, _] = await connection.execute(sql, values);
    res.json(result.serverStatus);
  } catch (err) {
    console.log(err);
  }
});
//localhost:3001/api/clientes/?id=12
router.delete("/", async function (req, res) {
  try {
    const connection = await pool_mysql.getConnection();
    await connection.release();
    const procedure = "delete from producto where id_producto=? limit 1";
    const values = [req.query.id];
    const [result, _] = await connection.execute(procedure, values);
    res.json({
      response: `${result.serverStatus}${result.warningStatus}${result.changedRows}`,
    });
  } catch (err) {
    console.log(err);
  }
});
//localhost:3001/api/clientes/12
router.put("/:id", async function (req, res) {
  try {
    const data = Object.values(req.body);
    const connection = await pool_mysql.getConnection();
    await connection.release();
    const procedure =
      "update `producto` set `nombre`=?,`descripcion`=?,`precio_unitario`=?,`stock_minimo`=? where `id_producto`=? limit 1";
    const values = [...data, req.params.id];
    const [result, _] = await connection.execute(procedure, values);
    res.json({
      response: `${result.serverStatus}${result.warningStatus}${result.changedRows}`,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
