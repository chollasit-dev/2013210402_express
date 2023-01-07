var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController');
const menuController = require('../controllers/menuController');

router.get('/', shopController.index);

router.get ('/menu', menuController.index);

router.get ('/:id', shopController.show);

router.post('/', shopController.insert);

module.exports = router;
