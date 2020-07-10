const bcrypt =  require('bcryptjs');
const helpers = {};

helpers.encryptPassword =  async (password) =>{
    try {
        const hash =  await bcrypt.hash(password,12);
        return hash;
    } catch (e) {
        console.log(e)
    }
};

helpers.matchPassword = async (password , DBpassword) =>{
    try {
        return await bcrypt.compare(password,DBpassword);
    } catch (e) {
        console.log(e)
    }
};

helpers.isLogenIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/cards/sign-in');
    }
}

helpers.isNotLogeIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/cards/home');
    }
}

module.exports =  helpers;

