const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'juviexpress_bdd'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNETED!');
});



module.exports = db;