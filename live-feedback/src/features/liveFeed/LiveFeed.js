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
    console.log('from mock')
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
      { feed && feed.map(feedback => {
          return (
            <div>feedback.body</div>
          )
        }) }
    </div>
  );
}
/*
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
*/