import React from 'react';
import './App.css';
import {
  Banner,
  FeedbackBullets,
  VoteBullets,
} from './containers';

function App() {
  const showFeedbackPage = () => console.log('show feedback page');
  const showVotePage = () => console.log('show vote page');

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-div">
          <Banner></Banner>
          <ul className="nav">
            <li className="nav-item">
              <button className="btn btn-primary nav-link" style={{ cursor: 'pointer' }} onClick={() => showFeedbackPage()} id="feedbackNavLink">Feedback System</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary nav-link" style={{ cursor: 'pointer' }} onClick={() => showVotePage()} id="voteNavLink">Voting System</button>
            </li>
          </ul>
          <div id="feedbackDiv" style={{ display: 'none' }}>
            <FeedbackBullets></FeedbackBullets>
            <div className="text-right">
              <a href="/feedback">
                <button type="button" className="btn btn-primary" id="feedbackButton">Feedback System</button>
              </a>
            </div>
            <div className="vertical-margin text-right">
              <a href="/feedback?isTutorial=true">
                <button type="button" className="btn btn-secondary" id="feedbackButton">Feedback Tutorial</button>
              </a>
            </div>
          </div>
          <div id="voteDiv" className="vertical-margin" style={{ display: 'none' }}>
            <VoteBullets></VoteBullets>
            <div className="text-right">
              <a href="/vote">
                <button type="button" className="btn btn-primary" id="feedbackButton">Voting System</button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
