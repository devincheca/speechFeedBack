var express = require('express');
var router = express.Router();
const {
  DOMPurify,
  LinkChecker,
  PhoneEncryptor,
  PhoneDecryptor,
  SmsMessanger,
  VoteChecker,
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
  const { linkId: link, originator } = await voteLink.getNewVotingLink();
  res.render('vote', { title: 'Express', link, originator });
});

router.post('/getVotes', (req, res, next) => {
  const votes = new VoteChecker();
  votes.link = req.body.link;
  votes.originator = req.body.originator;
  res.json({ votes: votes.getVotes() });
});

router.get('/castVote/:token', (req, res, next) => {
  const scrubber = new DOMPurify();
  scrubber.dirty = req.params.token;
  res.render('submitvote', { token: scrubber.scrub() });
});

router.post('/saveVote', (req, res, next) => {
  // need to handle the case here by adding a field to the data to say that the vote cannot be saved until the other requests are done being saved
  res.json({ isSaved })
});

module.exports = router;
