import React, { useState } from 'react';
import {
  Banner,
  FeedbackBullets,
  VoteBullets,
} from './index';

export default function Home() {
  const [isFeedbackShowing, setFeedbackShowing] = useState(true);

  const showFeedbackPage = () => setFeedbackShowing(!isFeedbackShowing);

  const getFeedbackBtnClass = () => isFeedbackShowing ? "btn btn-primary nav-link margin-25" : "btn btn-secondary nav-link margin-25";
  const getVotingBtnClass = () => !isFeedbackShowing ? "btn btn-primary nav-link margin-25" : "btn btn-secondary nav-link margin-25";

  return (
    <>
      <Banner />
      <ul className="nav">
        <li className="nav-item">
          <button className={getFeedbackBtnClass()} style={{ cursor: 'pointer' }} onClick={() => showFeedbackPage()} id="feedbackNavLink">Feedback</button>
        </li>
        <li className="nav-item">
          <button className={getVotingBtnClass()} style={{ cursor: 'pointer' }} onClick={() => showFeedbackPage()} id="voteNavLink">Voting</button>
        </li>
      </ul>
      { isFeedbackShowing &&
        <div id="feedbackDiv">
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
      }
      { !isFeedbackShowing &&
        <div id="voteDiv" className="vertical-margin">
          <VoteBullets></VoteBullets>
          <div className="text-right">
            <a href="/vote">
              <button type="button" className="btn btn-primary" id="feedbackButton">Voting System</button>
            </a>
          </div>
        </div>
      }
    </>
  );
}
