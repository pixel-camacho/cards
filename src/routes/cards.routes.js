const {Router} = require('express');
const router = Router();

const {create} = require('../controller/cards.controller');

router.get('/create/:id', create);


module.exports = router;  