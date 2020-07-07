const conn  = require('../database');

const helpers   = require('../lib/helper');

const authController = {};

/*authController.sign_in = (req, res) => {
    console.log(req.body)
    res.redirect('/home');    
};*/

authController.sign_up = async (req, res) =>{
    const {usuario, nombre, correo, password} = req.body;

    const newUser = {
        usuario,
        nombre,
        correo,
        password
    }
    newUser.password = await helpers.encryptPassword(password);
    const result =  await conn.query('INSERT INTO usuarios SET ?',[newUser]);
    newUser.id =  result.insertId;
    req.flash('success', 'Usuario agregado')
    res.send({status:'OK',data: result})
};


module.exports = authController;