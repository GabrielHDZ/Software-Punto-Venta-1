const mysql = require('mysql2/promise');
require('dotenv').config();

const password=process.env.DATABASE_MYSQL_KEY;
const pool_mysql = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'sakila'
});
module.exports=pool_mysql;


// Ejemplo de conexión:
/* (async () => {
  try {
    const connection = await pool_mysql.getConnection();
    console.log('Conexión a la base de datos establecida');
    // Realizar consultas aquí
    await connection.release();
    // Ejecutar una consulta de selección
  const [rows, fields] = await connection.execute('SELECT * FROM store');
  console.log(rows); // Los resultados de la consulta
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})(); */