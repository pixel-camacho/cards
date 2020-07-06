const {Router} =  require('express');
const router =  Router();

router.get('/', (req, res)=>{
    res.render('pages/index.ejs', {title: 'Home'})
});

module.exports =  router;