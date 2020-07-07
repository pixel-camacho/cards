const bcrypt =  require('bcrypt');
const helpers = {};

helpers.encryptPassword =  async (pass) =>{
    try {
        const salt =  await bcrypt.genSalt(10);
        const hash =  await bcrypt.hash(pass,salt);
        return hash;
    } catch (e) {
        console.log(e);
    }
};

helpers.matchPassword = async (pass , savePass) =>{
    try {
        return await bcrypt.compare(pass,savePass);
    } catch (e) {
        console.log(e);
    }
};

module.exports =  helpers;

