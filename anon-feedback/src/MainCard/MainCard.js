import React, { useState } from 'react';
import { copyToClipboard, Request } from '../helpers/helpers.js';
import HeaderInstructions from '../HeaderInstructions/HeaderInstructions.js';
import TopBanner from '../TopBanner/TopBanner.js';
import styles from './styles.js'

function MainCard() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoaderActive, setLoader] = useState(false);
  const [isLinkSuccess, setLinkSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackLink, setFeedbackLink] = useState('');
  const [copyStatusText, setCopyStatusText] = useState('');

  return (
    <div className="">
      <TopBanner />
      <HeaderInstructions headerText="Input your phone number to receive anonymous feedback for your speech" />
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          id="phoneNumber"
          placeholder="Input Phone Number (10 digits)"
          onKeyUp={(event) => setPhoneNumber(event.target.value)} />
      </div>
      <div className="form-group text-right" id="feedbackButtonDiv">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => getLink()}
          id="feedbackButton"
          style={isLoaderActive ? { display: 'none' } : { display: 'initial' }}>
            Get Feedback Link
        </button>
        <button
          className="btn btn-primary"
          disabled
          style={isLoaderActive ? { display: 'initial'} : { display: 'none' }}
          id="loaderButton">
          <span className="spinner-border spinner-border-sm"></span>
          Loading..
        </button> 
      </div>
      <div>
        <div className="copyPasteGroup">
          <div className="form-group" id="linkDiv" style={isLinkSuccess ? { display: 'initial' } : { display: 'none' }}>
            <input type="text" disabled className="form-control" id="linkInput" value={feedbackLink} />
          </div>
          <div id="copyStatus">{copyStatusText}</div>
          <div
            className="form-group text-right"
            id="copyButtonDiv"
            style={isLinkSuccess ? { display: 'initial' } : { display: 'none' }}>
            <button type="button" className="btn btn-primary" onClick={() => copyLinkToClipboard()}>
              <span style={new styles().copyParent()}>
                📄<span style={new styles().copyIcon()}>📄</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div id="successDiv" style={{ color: 'green' }}>{successMessage}</div>
      <div id="failDiv" style={{ color: 'red' }}>{errorMessage}</div>
    </div>
  );
  async function getLink() {
    try {
      setLoader(!isLoaderActive);
      const req = new Request();
      req.endpoint = 'feedback';
      req.data = { phoneNumber };
      const res = await req.send();
      console.log(res);
      setLoader(!isLoaderActive);
      setLinkSuccess(true);
      setSuccessMessage('this worked');
      setFeedbackLink('this link from the res');
    } catch(error) {
      setErrorMessage('something bad happened');
    }
  }
  function copyLinkToClipboard() {
    copyToClipboard(feedbackLink, () => {
      setCopyStatusText('Copied!');
      setTimeout(() => { setCopyStatusText(''); }, 4000);
    });
  }
}

export default MainCard;
