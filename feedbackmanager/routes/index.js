var express = require('express');
var router = express.Router();
const { LinkChecker, PhoneEncryptor, PhoneDecryptor, SmsMessanger } = require('../helpers/helpers');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/feedback/:token', function(req, res, next) {
  console.log(req.params.token);
  res.render('feedback');
});

router.post('/getLink', (req, res, next) => {
  const encryptor = new PhoneEncryptor();
  encryptor.phoneNumber = req.body.phoneNumber;
  encryptor.callback = (encryptedNumber) => {
    res.json({ token: encryptedNumber });
  };
  encryptor.encryptNumber();
});

router.post('/checkLink', async (req, res, next) => {
  const checker = new LinkChecker();
  checker.token = req.body.token;
  const isValid = await checker.checkToken();
  res.json({ isValid });
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
