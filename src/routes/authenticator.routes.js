const {Router} = require('express');
const router = Router();

const passport = require('passport');
const {sign_up} = require('../controller/auth.controller');

router.get('/sign-in', (req, res) =>{
    res.render('pages/login.ejs',{title:'Iniciar session'});
});

router.post('/sign-in', passport.authenticate('local',{
        successRedirect: '/home',
        failureRedirect: '/sign-in',
        failureFlash: true 
    }));

router.get('/home', (req,res) =>{
    res.render('pages/Home.ejs')
});

router.post('/sign-up', sign_up);


module.exports = router;