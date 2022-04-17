import React, { useState } from 'react';
import {
  FeedbackBullets,
  VoteBullets,
} from './index';

export default function Feedback() {
  const [isFeedbackShowing, setFeedbackShowing] = useState(true);

  const showFeedbackPage = () => setFeedbackShowing(!isFeedbackShowing);

  const getFeedbackBtnClass = () => isFeedbackShowing ? "btn btn-primary nav-link margin-25" : "btn btn-secondary nav-link margin-25";
  const getVotingBtnClass = () => !isFeedbackShowing ? "btn btn-primary nav-link margin-25" : "btn btn-secondary nav-link margin-25";

  return (
    <>
      implement feedback UI here
    </>
  );
}
