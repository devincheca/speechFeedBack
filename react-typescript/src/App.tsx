// React 
import React, { useState } from 'react';

// CSS
import './App.css';

// Containers
import {
  Banner,
  Feedback,
  Home
} from './containers';

// Constants
import { NAV_PAGES } from './constants';

function App() {
  const [page, setPage] = useState('Home');

  const currentPage = {
    [NAV_PAGES.HOME]: <Home onPageNav={setPage} />,
    [NAV_PAGES.FEEDBACK]: <Feedback />,
  }[page];

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-div">
          <Banner />
          { currentPage }
        </div>
      </header>
    </div>
  );
}

export default App;
