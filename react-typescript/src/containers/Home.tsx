import React, { useState } from 'react';
import {
  Banner,
  FeedbackBullets,
  VoteBullets,
} from './index';

export interface homeProps {
  onPageNav: (pageName: string) => void;
};

export default function Home(props: homeProps) {

  const { onPageNav } = props;
  const [isFeedbackShowing, setFeedbackShowing] = useState(true);

  const showFeedbackPage = (isFeedbackShowing: boolean) => setFeedbackShowing(isFeedbackShowing);

  const getFeedbackBtnClass = () => isFeedbackShowing ? "btn btn-primary nav-link margin-25" : "btn btn-secondary nav-link margin-25";
  const getVotingBtnClass = () => !isFeedbackShowing ? "btn btn-primary nav-link margin-25" : "btn btn-secondary nav-link margin-25";

  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <button className={getFeedbackBtnClass()} style={{ cursor: 'pointer' }} onClick={() => showFeedbackPage(true)} id="feedbackNavLink">Feedback</button>
        </li>
        <li className="nav-item">
          <button className={getVotingBtnClass()} style={{ cursor: 'pointer' }} onClick={() => showFeedbackPage(false)} id="voteNavLink">Voting</button>
        </li>
      </ul>
      { isFeedbackShowing &&
        <div id="feedbackDiv">
          <FeedbackBullets></FeedbackBullets>
          <div className="text-right">
            <button
              type="button"
              className="btn btn-primary"
              id="feedbackButton"
              onClick={() => onPageNav('Feedback')}>
                Feedback System
            </button>
          </div>
          <div className="vertical-margin text-right">
            <button
              type="button"
              className="btn btn-secondary"
              id="feedbackButton"
              onClick={() => onPageNav('FeedbackTutorial')}>
                Feedback Tutorial
            </button>
          </div>
        </div>
      }
      { !isFeedbackShowing &&
        <div id="voteDiv" className="vertical-margin">
          <VoteBullets></VoteBullets>
          <div className="text-right">
            <button
              type="button"
              className="btn btn-primary"
              id="feedbackButton"
              onClick={() => onPageNav('Vote')}>
                Voting System
            </button>
          </div>
        </div>
      }
    </>
  );
}
