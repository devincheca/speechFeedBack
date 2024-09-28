import React, { createContext, useCallback, useState } from 'react';
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

export const BackButtonContext = createContext({ back: () => {}, page: NAV_PAGES.HOME });

function App() {
  const [page, setPage] = useState(NAV_PAGES.HOME);
  const [Id] = useState(uuidv1());

  const currentPage = {
    [NAV_PAGES.HOME]: <Home onPageNav={setPage} Id={Id} />,
    [NAV_PAGES.FEEDBACK]: <Feedback />,
    [NAV_PAGES.VOTE]: <Vote Id={Id} />,
  }[page];

  const back = useCallback(() => setPage(NAV_PAGES.HOME), [page]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-div">
          <BackButtonContext.Provider value={{ back, page }}>
            <Banner />
          </BackButtonContext.Provider>
          { currentPage }
        </div>
      </header>
    </div>
  );
}

export default App;
