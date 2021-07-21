var express = require('express');
var router = express.Router();
const {
  DOMPurify,
  LinkChecker,
  PhoneEncryptor,
  PhoneDecryptor,
  SmsMessanger,
  VoteLink
} = require('../helpers/helpers');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/feedback', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/feedback/:token', (req, res, next) => {
  const scrubber = new DOMPurify();
  scrubber.dirty = req.params.token;
  res.render('feedback', { token: scrubber.scrub() });
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
  const scrubber = new DOMPurify();
  scrubber.dirty = req.body.feedback;
  messanger.feedback = scrubber.scrub();
  const isSent = await messanger.send();
  res.json({ isSent });
});

router.get('/vote', async (req, res, next) => {
  const voteLink = new VoteLink();
  const link = await voteLink.getNewVotingLink();
  res.render('vote', { title: 'Express', link });
});

module.exports = router;
