const passport =  require('passport');
const LocalStrategy  = require('passport-local').Strategy;

const conn = require('../database');
const helper =  require('./helper');

passport.use('local.signin',new LocalStrategy ({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, password, done) =>{
    const localizados =  await conn.query('SELECT * FROM usuarios WHERE usuario = ?',[usuario])
    if(localizados.length > 0){
        const usuario = localizados[0]
        const valida =  await helper.matchPassword(password, usuario.password);
        if(valida){
            done(null, usuario, req.flash('success','Welcome '+ usuario.nombre));
        }else{
            done(null,false, req.flash('message','Incorrect password'));
        }
    }else{
        return done(null, false, req.flash('message','The usrename does not exists'));
    }
}));

passport.use('local.signup',new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, usuario, password, done)=>{

    const {correo,nombre} = req.body;
    const nuevoUsuario = {
        usuario,
        nombre,
        correo,
        password
    };
    nuevoUsuario.password = await helper.encryptPassword(password);
    const  resultado =  await conn.query('INSERT INTO usuarios SET ?',nuevoUsuario);
    nuevoUsuario.id =  resultado.insertId;
    return done(null, nuevoUsuario);
})); 


passport.serializeUser((usuario,done) =>{
    done(null,usuario.id)
});

passport.deserializeUser(async(id, done)=>{
    const filas = await conn.query('SELECT * FROM usuarios WHERE id = ?',[id])
    done(null,filas[0])
});
