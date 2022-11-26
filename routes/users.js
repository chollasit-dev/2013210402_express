var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('Hello, Kitty!');
  res.status(200).json({
    fullname: "Chollasit Vibulsirikul"
  })
});

router.get('/bio', function(req, res, next){
  res.status(200).json({
    fullname: "Chollasit Vibulsirikul",
    nickname: "Chin",
    hobby: "Play Games",
    gitusername: "chollasit-dev"
  })
})

module.exports = router;
