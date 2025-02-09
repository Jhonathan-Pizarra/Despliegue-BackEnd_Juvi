const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'mysql-juviexpressapp.alwaysdata.net',
    user: '384601',
    password: 'Uchih4Jhonathan23',
    database: 'juviexpressapp_2024'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNETED!');
});



module.exports = db;