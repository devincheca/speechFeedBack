import React, { useState, useEffect, useRef } from 'react';
import { v1 as uuidv1 } from 'uuid';

// Requests
import { createWithPhone } from '../requests/createWithPhone';

// Components
import {
  CopyButton,
  LoadingButton,
  PhoneNumberInput,
} from '../components';

// Types
import { PhoneNumber } from '../types/PhoneNumber';

// Helpers
import { copyToClipboard, getQrCode } from '../helpers';

export default function Feedback() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNumberHidden, setIsNumberHidden] = useState(true);
  const [phone, setPhone] = useState<PhoneNumber>();
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  const [Id] = useState(uuidv1());
  const [copyStatus, setCopyStatus] = useState('');

  const getLinkButton = useRef<HTMLButtonElement>(null);
  const qrBox = useRef<HTMLCanvasElement>(null);
  const linkBox = useRef<HTMLInputElement>(null);

  const isPhoneValid = () => phone && parseInt(phone.areaCode) && parseInt(phone.firstThree) && parseInt(phone.lastFour);

  const copyLink = () => {
    const result = copyToClipboard(linkBox);

    result.isFailedCopy
      ? setCopyStatus('Failed')
      : setCopyStatus('Copied');

    setTimeout(() => setCopyStatus(''), 3000);
  };

  useEffect(() => {
    if (qrBox && qrBox.current) {
      getQrCode(qrBox.current, link);
    }
  }, [qrBox, link]);

  const getLink = async () => {
    if (isPhoneValid() && phone) {
      setIsLoading(true);
      await createWithPhone(phone, Id);
      setLink(`https://ti-manager.com?feedbackId=${Id}`);
      setIsLoading(false);
      copyLink();
    } else {
      setError('Please enter a valid phone number (10 digits, US only)');
    }
  };

  return (
    <>
      <div className="inputPhoneHeader">Input your phone number (10 digits, US only) to receive anonymous feedback for your speech</div>
      <div>
        <PhoneNumberInput
          focusNext={phone => { setPhone(phone); getLinkButton && getLinkButton.current && getLinkButton.current.focus(); }}
          isNumberHidden={isNumberHidden}
        />
        <div className="form-check" style={{ marginTop: '.25em', marginBottom: '.25em' }}>
          <div className="form-check-label">
            <input type="checkbox" className="form-check-input" value="" onClick={() => setIsNumberHidden(!isNumberHidden)} />
            <span style={{ verticalAlign: 'middle' }}>{`${isNumberHidden ? 'Show' : 'Hide'} Phone Number`}</span>
          </div>
        </div>
        <div className="form-group text-right">
          { !isLoading && <button ref={getLinkButton} type="button" className="btn btn-primary" onClick={() => getLink()}>Get Feedback Link</button> }
          { isLoading && <LoadingButton /> }
        </div>
        { link &&
          <div className="form-group text-center vertical-margin link-font">
            Send the following link to club members you would like to receive speech feedback from:
          </div>
        }
        <div className="copyPasteGroup">
          { link &&
            <div className="form-group">
              <input type="text" disabled className="form-control" value={link} ref={linkBox} />
            </div>
          }
          <div></div>
          { link && <CopyButton copy={() => copyLink()} copyStatus={copyStatus} /> }
        </div>
        { link && <div className="form-group text-center" id="qrCodeImage">
            <div>For hybrid meetings:</div>
            <canvas ref={qrBox}></canvas>
          </div>
        }
        <div className="form-group text-right" style={{ display: 'none' }}>
          { !isLoading && <button type="button" className="btn btn-primary">Send Test Message</button> }
          { isLoading && <LoadingButton /> }
        </div>
      </div>
      { error && <div style={{ color: 'red' }}>{error}</div> }
    </>
  );
}
