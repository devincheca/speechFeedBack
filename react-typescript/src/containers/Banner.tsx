import React from 'react';

export default function Banner() {
  return (
    <div className="topBarDiv" style={{ color: 'black', fontSize: '.75em' }}>
      <div>
        <img
          style={{
            verticalAlign: 'middle',
            borderStyle: 'none',
            width: '25px',
          }}
          src="https://localbz.co/Dreambuilders/logo.png"
        />
      </div>
      <div style={{ textAlign: 'right' }}>Toastmasters Hybrid Meeting System</div>
    </div>
  );
}
