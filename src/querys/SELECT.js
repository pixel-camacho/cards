const conn = require('../database');
const query = {};

query.buscarAlumno = async (id) =>{

    const alumno = await conn.query(`SELECT
                                            CONCAT(nombre,' ',apellido_paterno,' ',apellIdo_materno) AS nombre,
                                            grado,
                                            grupo,
                                            periodo
                                     FROM
                                          alumno a JOIN grupo g ON a.id_grupo =  g.id_grupo
                                     WHERE 
                                           id_alumno = ? `,[id]);
    return alumno;

}

query.obtenerAlumnos = async () =>{

    const alumnos = await conn.query(`SELECT
                                             CONCAT(nombre,' ',apellido_paterno,' ',apellido_materno) AS nombre,
                                             grado,
                                             grupo,
                                             periodo,
                                             id_alumno
                                       FROM 
                                            alumno a JOIN grupo g ON a.id_grupo = g.id_grupo`);
    return alumnos;
}

module.exports =  query;