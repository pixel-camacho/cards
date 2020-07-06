const {Router} = require('express');
const router = Router();

router.get('/signin', (req, res) =>{
    res.render('pages/login.ejs',{title: 'Iniciar sessión'})
});

router.post('/signin', (req, res) =>{
   console.log(req.body)
    res.send('recaived')
});

module.exports = router;