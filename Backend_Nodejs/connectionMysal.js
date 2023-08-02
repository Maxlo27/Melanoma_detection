import  mysql  from "promise-mysql";
mysql.createPool({
connectionLimit:process.env.connectionLimit,
host:process.env.DB_HOST,
USER:process.env.DB_USER,
password:process.env.DB_PASSWORD,
database:process.env.DB_NAME,
})