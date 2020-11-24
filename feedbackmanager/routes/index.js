var express = require('express');
var router = express.Router();
const phoneEncryptor = require('../helpers/PhoneEncryptor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getLink', (req, res, next) => {
  const encryptor = new phoneEncryptor();
  encryptor.encryptNumber();
  res.json({ token: encryptor.encryptedNumber });
});

module.exports = router;
