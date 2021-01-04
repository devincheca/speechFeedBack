import React, { useState } from 'react';
import Request from '../helpers/request.js';

function MainCard() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoaderActive, setLoader] = useState(false);
  const [isLinkSuccess, setLinkSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="">
      <div className="inputPhoneHeader">Input your phone number to receive anonymous feedback for your speech</div>
      <div className="form-group">
        <input type="number" className="form-control" id="phoneNumber" placeholder="Input Phone Number (10 digits)" onKeyUp={(event) => setPhoneNumber(event.target.value)} />
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
        <button className="btn btn-primary" disabled style={isLoaderActive ? { display: 'initial'} : { display: 'none' }} id="loaderButton">
          <span className="spinner-border spinner-border-sm"></span>
          Loading..
        </button> 
      </div>
      <div>
        <div className="copyPasteGroup">
          <div className="form-group" id="linkDiv" style={isLinkSuccess ? { display: 'initial' } : { display: 'none' }}>
            <input type="text" disabled className="form-control" id="linkInput" />
          </div>
          <div id="copyStatus"></div>
          <div className="form-group text-right" id="copyButtonDiv" style={isLinkSuccess ? { display: 'initial' } : { display: 'none' }}>
            <button type="button" className="btn btn-primary" onClick={() => copyToClipboard()}>
              <span style={{ fontSize: '.875em', marginRight: '.125em', position: 'relative', top: '-.25em', left: '-.125em' }}>
                📄<span style={{ position: 'absolute', top: '.25em', left: '.25em' }}>📄</span>
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
      toggleLoaderButton();
      const req = new Request();
      req.endpoint = 'feedback';
      req.data = { phoneNumber };
      const res = await req.send();
      console.log(res);
      toggleLoaderButton();
      setLinkSuccess(true);
      setSuccessMessage('this worked');
    } catch(error) {
      setErrorMessage('something bad happened');
    }
  }
  function toggleLoaderButton() { setLoader(!isLoaderActive) }
  function copyToClipboard(text) {
    let isCopied = true;
    if (window.clipboardData && window.clipboardData.setData) {
      updateCopyStatus();
      return window.clipboardData.setData("Text", text);
    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      const textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
        isCopied = false;
        console.warn("Copy to clipboard failed.", ex);
        return false;
      }
      finally {
        if (isCopied) { updateCopyStatus(); }
        document.body.removeChild(textarea);
      }
    }
  }
  function updateCopyStatus() {
    const copyStatus = document.getElementById('copyStatus');
    copyStatus.innerHTML = 'Copied!';
    setTimeout(() => { copyStatus.innerHTML = ''; }, 4000);
  }
}

export default MainCard;
