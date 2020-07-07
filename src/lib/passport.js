const conn = require('../database');
const helper =  require('../lib/helper');
const passport =  require('passport');
const LocalStrategy  = require('passport-local').Strategy;

/* passport.use('local.signup',new LocalStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, user, pass, done)=>{

    const {mail,name} = req.body;
    const nuevoUsuario = {
        user,
        name,
        mail,
        pass
    };
    nuevoUsuario.pass = await helper.encryptPassword(pass);
    const  resultado =  await conn.query('INSERT INTO usuarios SET ? ',[nuevoUsuario]);
    nuevoUsuario.id =  resultado.insertId;
    return done(null, nuevoUsuario);
})); 
*/

passport.use(new LocalStrategy ({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, password, done) =>{
    const localizados =  await conn.query('SELECT * FROM usuarios WHERE usuario = ? ',[usuario])
    if(localizados > 0){
        const user = localizados[0]
        const valida =  await helper.matchPassword(password,user.password);
        if(valida){
            done(null, user, req.flash('success','Welcome '+ user.nombre));
        }else{
            done(null,false, req.flash('message','Incorrect password'));
        }
    }else{
        return done(null, false, req.flash('message','The usrename does not exists'));
    }
}));

passport.serializeUser((user,done) =>{
    done(null,user.id)
});

passport.deserializeUser(async(id, done)=>{
    const filas = await conn.query('SELECT * FROM usuarios WHERE id = ?',[id])
    done(null,filas[0])
});
