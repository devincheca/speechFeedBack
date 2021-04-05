import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import liveFeedReducer from '../features/liveFeed/liveFeedSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    liveFeed: liveFeedReducer,
  },
});
