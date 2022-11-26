var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('Hello, Index!');
  res.status(200).json({
    fullname: "Chollasit Vibulsirikul"
  })
});

router.get('/bio', userController.bio);

router.get('/', userController.index);

module.exports = router;
