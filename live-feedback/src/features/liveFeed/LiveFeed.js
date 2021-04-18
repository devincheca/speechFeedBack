import React /*, { useState } */ from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFeed,
  updateFeed
} from './liveFeedSlice';
import styles from './LiveFeed.module.css';

export function LiveFeed() {
  const feed = useSelector(selectFeed);
  // const [incrementAmount, setIncrementAmount] = useState('2');
  const dispatch = useDispatch();

  function onFeedbackMock() {
    console.log(feed)
    // the web socket connection is what will dispatch
    const sampleFeedback = {
      body: 'sample feedback'
    }
    dispatch(updateFeed(sampleFeedback))
  }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => onFeedbackMock()}
        >
          Mock Feedback Receive
        </button>
      </div>
      { feed.stream && feed.stream.map((feedback, i) => {
        return (
          <div key={i}>{feedback.body}</div>
        )
      }) }
    </div>
  );
}
