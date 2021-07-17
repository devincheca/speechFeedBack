var express = require('express');
var router = express.Router();
const {
  LinkChecker,
  PhoneEncryptor,
  PhoneDecryptor,
  SmsMessanger,
  VoteLink
} = require('../helpers/helpers');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/feedback/:token', (req, res, next) => {
  res.render('feedback', { token: req.params.token });
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

router.post('/sendFeedback', async (req, res, next) => {
  const decryptor = new PhoneDecryptor();
  decryptor.encryptedNumber = req.body.token;
  const phoneNumber = await decryptor.decryptNumber();
  const messanger = new SmsMessanger();
  messanger.phoneNumber = decryptor.phoneNumber;
  messanger.feedback = req.body.feedback;
  const isSent = await messanger.send();
  res.json({ isSent });
});

router.get('/vote', async (req, res, next) => {
  const voteLink = new VoteLink();
  const link = await voteLink.getNewVotingLink();
  res.render('vote', { title: 'Express', link });
});

module.exports = router;
