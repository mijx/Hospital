// Archivo de configuración para la base de datos

const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'hospital'
})

conexion.connect(function (error) {
    if (error) {
        console.log(`Ocurrio un error en la conexion ${error}`)
        return;
    } else {
        console.log('Conexion exitosa')
    }
})

module.exports = {conexion}