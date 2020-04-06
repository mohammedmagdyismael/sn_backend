const mysql = require('mysql'); 
const config = require('config')

const hostIP = config.get('mysql_host');
const user = config.get('mysql_user');
const password = config.get('mysql_password');
const defaultDB = config.get('mysql_defaultDB');

// connection configurations
var dbConn = mysql.createConnection({
    host: hostIP,
    user: user,
    password: password,
    database: defaultDB
}); 

// connect to database
dbConn.connect();