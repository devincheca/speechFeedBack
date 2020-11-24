var express = require('express');
var router = express.Router();
const PhoneEncryptor = require('../helpers/PhoneEncryptor');
const PhoneDecryptor = require('../helpers/PhoneDecryptor');
const SmsMessanger = require('../helpers/SmsMessanger');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/feedback/:token', function(req, res, next) {
  console.log(req.params.token);
  res.render('feedback');
});

router.post('/getLink', (req, res, next) => {
  const encryptor = new PhoneEncryptor();
  encryptor.encryptNumber();
  res.json({ token: encryptor.encryptedNumber });
});

router.post('/sendFeedback', (req, res, next) => {
  const decryptor = new PhoneDecryptor();
  decryptor.decryptNumber();
  const messanger = new SmsMessanger();
  messanger.phoneNumber = decryptor.phoneNumber;
  messanger.send();
  res.json({ isSent: messanger.isSent });
});

module.exports = router;
