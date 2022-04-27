import React, { useState } from 'react';
import {
  FeedbackBullets,
  VoteBullets,
} from './index';

export default function Feedback() {
  const [areaCode, setAreaCode] = useState('');
  const [firstThree, setFirstThree] = useState('');
  const [lastFour, setLastFour] = useState('')

  // need to manually handle autofocus with a ref
  const nextFocus = (placement: string) => console.log('placement: ', placement);

  return (
    <>
      <div className="inputPhoneHeader">Input your phone number (10 digits, US only) to receive anonymous feedback for your speech</div>
      <div>
        <div className="form-group phone-input-div text-center">
          {/* <span>1(</span> */}
          <input
            type="password"
            className="form-control text-center"
            id="areaCode"
            placeholder="999"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setAreaCode(event.target.value); nextFocus('areaCode'); }}
          />
          {/* <span>)</span> */}
          <input
            type="password"
            className="form-control text-center"
            id="firstThree"
            placeholder="999"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFirstThree(event.target.value); nextFocus('firstThree'); }}
          />
          {/* <span>-</span> */}
          <input
            type="password"
            className="form-control text-center"
            id="lastFour"
            placeholder="9999"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setLastFour(event.target.value); nextFocus('lastFour'); }}
          />
        </div>
        <div className="form-check" style={{ marginTop: '.25em', marginBottom: '.25em' }}>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" value="" onClick={() => console.log('togglePasswordView()')} />Show Phone Number
            {/* <input type="checkbox" className="form-check-input" value="" onClick={() => console.log('togglePasswordView()')}>Show / Hide Phone Number</input> */}
          </label>
        </div>
        <div className="form-group text-right" id="feedbackButtonDiv">
          <button type="button" className="btn btn-primary" onClick={() => console.log('getLink()')} id="feedbackButton">Get Feedback Link</button>
          <button className="btn btn-primary" disabled style={{ display: 'none' }} id="loaderButton">
            <span className="spinner-border spinner-border-sm"></span>
            Loading..
          </button>
        </div>
        <div className="form-group text-center vertical-margin" id="linkInstructions" style={{ display: 'none' }}>
          Send the following link to club members you would like to receive speech feedback from:
        </div>
        <div className="copyPasteGroup">
          <div className="form-group" id="linkDiv" style={{ display: 'none' }}>
            <input type="text" disabled className="form-control" id="linkInput" />
          </div>
          <div id="copyStatus"></div>
          <div className="form-group text-right" id="copyButtonDiv" style={{ display: 'none' }}>
            <button type="button" className="btn btn-primary" onClick={() => console.log('copyToClipboard()')}>
              <span style={{ fontSize: '.875em', marginRight: '.125em', position: 'relative', top: '-.25em', left: '-.125em' }}>
                📄<span style={{ position: 'absolute', top: '.25em', left: '.25em' }}>📄</span>
              </span>
            </button>
          </div>
        </div>
        <div className="form-group text-center" id="qrCodeImage" style={{ display: 'none' }}>
          <div>For hybrid meetings:</div>
        </div>
        <div className="form-group text-right" id="sendTestMessageDiv" style={{ display: 'none' }}>
          <button type="button" className="btn btn-primary" onClick={() => console.log('sendTestFeedback()')} id="testFeedbackButton">Send Test Message</button>
          <button className="btn btn-primary" disabled style={{ display: 'none' }} id="testFeedbackLoaderButton">
            <span className="spinner-border spinner-border-sm"></span>
            Loading..
          </button>
        </div>
      </div>
      <div id="successDiv" style={{ color: 'green' }}></div>
      <div id="failDiv" style={{ color: 'red' }}></div>
    </>
  );
}
