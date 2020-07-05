const {Router} = require('express');
const router = Router();

router.get('/', (req, res) =>{
    res.render('login.ejs',{title: 'Iniciar sessión'})
});

router.post('/sign-in',(req, res) =>{
   console.log(req.body)
    res.send('recaived')
});

module.exports = router;