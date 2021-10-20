var express = require('express');
var router = express.Router();
const {
  DOMPurify,
  FeedbackChecker,
  FeedbackLink,
  FeedbackSaver,
  LinkChecker,
  PhoneEncryptor,
  PhoneDecryptor,
  SmsMessanger,
  VoteChecker,
  VoteLink,
  VoteSaver
} = require('../helpers/helpers');

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Home' });
});

router.get('/feedback', async (req, res, next) => {
  const feedbackLink = new FeedbackLink();
  const { linkId: link, originator } = await feedbackLink.getNewVotingLink();
  res.render('index', { title: 'Express', link, originator });
  // VVV for phone VVV
  // res.render('index', { title: 'Express' });
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

router.post('/sendSpeechFeedback', async (req, res, next) => {
  const feedbackSaver = new FeedbackSaver();
  const scrubber = new DOMPurify();
  scrubber.dirty = req.body.feedback;
  feedbackSaver.feedback = scrubber.scrub();
  feedbackSaver.token = req.body.token;
  const isSent = await feedbackSaver.save();
  res.json({ isSent });
});

router.get('/vote', async (req, res, next) => {
  const voteLink = new VoteLink();
  const { linkId: link, originator } = await voteLink.getNewVotingLink();
  res.render('vote', { title: 'Express', link, originator });
});

router.post('/getVotes', async (req, res, next) => {
  const votes = new VoteChecker();
  votes.link = req.body.link;
  votes.originator = req.body.originator;
  const result = await votes.getVotes();
  res.json({ votes: result });
});

router.post('/getFeedback', async (req, res, next) => {
  const votes = new FeedbackChecker();
  votes.link = req.body.link;
  votes.originator = req.body.originator;
  const result = await votes.getVotes();
  res.json({ votes: result });
});

router.get('/castVote/:token', (req, res, next) => {
  const scrubber = new DOMPurify();
  scrubber.dirty = req.params.token;
  res.render('submitvote', { token: scrubber.scrub() });
});

router.post('/saveVote', async (req, res, next) => {
  const saver = new VoteSaver();
  saver.vote = req.body.vote;
  saver.link = req.body.link;
  const isSaved = await saver.save();
  res.json({ isSaved })
});

module.exports = router;
