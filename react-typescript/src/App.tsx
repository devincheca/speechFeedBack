import React, { useState } from 'react';
import './App.css';
import {
  Banner,
  Feedback,
  Home
} from './containers';

function App() {
  const [page, setPage] = useState('Home');

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-div">
          <Banner />
          { page === 'Home' && <Home onPageNav={setPage} /> }
          { page === 'Feedback' && <Feedback /> }
        </div>
      </header>
    </div>
  );
}

export default App;
