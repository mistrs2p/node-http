import mysql, { PoolOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const access: PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Adjust the pool size based on your application's needs
  queueLimit: 0,
};
const pool = mysql.createPool(access);
// Log when the pool is created
console.log("MySQL pool created with limit:", pool.config.connectionLimit);

const mysqlDb = pool.promise();

mysqlDb.on("connection", (connection) => {
  console.log(`Connection ${connection.threadId} connection from pool.`);
});
// Log when a connection is acquired from the pool
mysqlDb.on("acquire", (connection) => {
  console.log(`Connection ${connection.threadId} acquired from pool.`);
});

// Log when a connection is released back to the pool
mysqlDb.on("release", (connection) => {
  console.log(`Connection ${connection.threadId} released back to pool.`);
});
export default mysqlDb;
