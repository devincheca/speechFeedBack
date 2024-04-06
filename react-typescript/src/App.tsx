import React, { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';

// CSS
import './App.css';

// Containers
import {
  Banner,
  Feedback,
  Home,
  Vote,
} from './containers';

// Constants
import { NAV_PAGES } from './constants';

function App() {
  const [page, setPage] = useState('Home');
  const [Id] = useState(uuidv1());

  const currentPage = {
    [NAV_PAGES.HOME]: <Home onPageNav={setPage} Id={Id} />,
    [NAV_PAGES.FEEDBACK]: <Feedback />,
    [NAV_PAGES.VOTE]: <Vote Id={Id} />,
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
