import React, { useContext } from 'react';

import { BackButtonContext } from '../App';
import { NAV_PAGES } from '../constants';

export default function Banner() {
  const { back, page } = useContext(BackButtonContext);

  return (
    <div className="topBarDiv" style={{ color: 'black', fontSize: '.75em' }}>
      <div>
        { page !== NAV_PAGES.HOME && <a href="#" onClick={back}> ← Back </a> }
        { page === NAV_PAGES.HOME && <img
          alt="TI"
          style={{
            verticalAlign: 'middle',
            borderStyle: 'none',
            width: '25px',
          }}
          src="https://localbz.co/Dreambuilders/logo.png"
        /> }
      </div>
      <div style={{ textAlign: 'right' }}>Toastmasters Hybrid Meeting System</div>
    </div>
  );
}
