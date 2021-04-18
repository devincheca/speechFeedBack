import React from 'react';
import { LiveFeed } from './features/liveFeed/LiveFeed';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LiveFeed />
      </header>
    </div>
  );
}

export default App;
