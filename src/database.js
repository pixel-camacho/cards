const mysql =  require('mysql');
const  {database} = require('./config');
const {promisify} = require('util');

const conn = mysql.createPool(database);

conn.getConnection((err, connection) =>{

    if(err){

        if(err.code === 'PROTOCOL_CONNECTION_LOST' ){
            console.error('LA CONEXIÓN DE BASE DE DATOS FUE CERRADA')
            return;
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE QUE CAMINAR CONEXIONES')
            return;
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION DE LA BASE DE DATOS FUE RECHAZAD')
            return;
        }
    }

    if(connection) connection.release();
    console.log('DB is connected');
    return;
});

conn.query = promisify(conn.query);

module.exports =  conn;