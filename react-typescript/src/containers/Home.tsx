import React, { useState } from 'react';
import {
  FeedbackBullets,
  VoteBullets,
} from './index';

// Containers
import { FeedbackForm } from '../containers/FeedbackForm';

// Constants
import { NAV_PAGES } from '../constants';

// Helpers
import { getInboundFeedbackLink } from '../helpers/getIsFeedbackLinkInbound';

export interface homeProps {
  onPageNav: (pageName: string) => void;
};

export default function Home(props: homeProps) {

  const { onPageNav } = props;
  const [isFeedbackShowing, setFeedbackShowing] = useState(true);
  const [inboundFeedbackLink] = useState(getInboundFeedbackLink);

  if (inboundFeedbackLink) return <FeedbackForm inboundFeedbackLink={inboundFeedbackLink} />

  const showFeedbackPage = (isFeedbackShowing: boolean) => setFeedbackShowing(isFeedbackShowing);

  const getFeedbackBtnClass = () => isFeedbackShowing ? "btn btn-primary nav-link margin-25" : "btn btn-secondary nav-link margin-25";
  const getVotingBtnClass = () => !isFeedbackShowing ? "btn btn-primary nav-link margin-25" : "btn btn-secondary nav-link margin-25";

  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <button className={getFeedbackBtnClass()} style={{ cursor: 'pointer' }} onClick={() => onPageNav(NAV_PAGES.FEEDBACK)} id="feedbackNavLink">{ NAV_PAGES.FEEDBACK } </button>
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
              onClick={() => onPageNav(NAV_PAGES.FEEDBACK)}>
                { NAV_PAGES.FEEDBACK } System
            </button>
          </div>
          <div className="vertical-margin text-right">
            <button
              type="button"
              className="btn btn-secondary"
              id="feedbackButton"
              onClick={() => onPageNav('FeedbackTutorial')}>
                { NAV_PAGES.FEEDBACK } Tutorial
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
