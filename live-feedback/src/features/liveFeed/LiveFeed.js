import React /*, { useState } */ from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './liveFeedSlice';
import styles from './LiveFeed.module.css';

function onFeedbackMock() {
  console.log('from feedback')
  // dispatch(increment())
  // the web socket connection is what will dispatch
}
export function LiveFeed() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

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