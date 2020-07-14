const {Router} = require('express');
const router = Router();

const {sign_up, sign_in, home} = require('../controller/auth.controller');
const {isLogenIn, isNotLogeIn} = require('../lib/helper');

router.get('/sign-in', isNotLogeIn ,(req, res) =>{
    res.render('pages/login.ejs',{title:'Iniciar session'});
});

router.post('/sign-in', sign_in);
  
router.post('/sign-up', sign_up);

router.get('/home',isLogenIn, home);

router.get('/cerrarSession', (req, res) =>{
    req.logOut();
    res.redirect('/cards/sign-in');
});

module.exports = router;