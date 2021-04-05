import React from 'react';
import logo from './logo.svg';
import { LiveFeed } from './features/liveFeed/LiveFeed';
// import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LiveFeed />
      </header>
    </div>
  );
}

export default App;
