import React, { useState, useRef } from 'react';
import { v1 as uuidv1 } from 'uuid';

// Requests
import { createWithPhone } from '../requests/createWithPhone';

// Components
import PhoneNumberInput from '../components/PhoneNumberInput';

// Types
import { PhoneNumber } from '../types/PhoneNumber';

export default function Feedback() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNumberHidden, setIsNumberHidden] = useState(true);
  const [phone, setPhone] = useState<PhoneNumber>();
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  const [qrCodeImageUrl] = useState('');
  const [Id] = useState(uuidv1());

  const getLinkButton = useRef<HTMLButtonElement>(null);

  const isPhoneValid = () => phone && parseInt(phone.areaCode) && parseInt(phone.firstThree) && parseInt(phone.lastFour);

  const getLink = async () => {
    if (isPhoneValid() && phone) {
      setIsLoading(true);
      // update TTL with Pascal case TimeStamp
      await createWithPhone(phone, Id);
      setLink(`https://ti-manager.com/feedback/${Id}`);
      setIsLoading(false);
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
          { isLoading &&
            <button className="btn btn-primary" disabled>
              <span className="spinner-border spinner-border-sm"></span>
              Loading..
            </button>
          }
        </div>
        { link &&
          <div className="form-group text-center vertical-margin link-font">
            Send the following link to club members you would like to receive speech feedback from:
          </div>
        }
        <div className="copyPasteGroup">
          { link &&
            <div className="form-group">
              <input type="text" disabled className="form-control" value={link} />
            </div>
          }
          <div></div>
          { link &&
            <div className="form-group text-right">
              <button type="button" className="btn btn-primary" onClick={() => console.log('copyToClipboard()')}>
                <span style={{ fontSize: '.875em', marginRight: '.125em', position: 'relative', top: '-.25em', left: '-.125em' }}>
                  📄<span style={{ position: 'absolute', top: '.25em', left: '.25em' }}>📄</span>
                </span>
              </button>
            </div>
          }
        </div>
        { qrCodeImageUrl &&
          <div className="form-group text-center">
            <div>For hybrid meetings:</div>
            <img alt="QR Code" src={qrCodeImageUrl} />
          </div>
        }
        <div className="form-group text-right" style={{ display: 'none' }}>
          { !isLoading && <button type="button" className="btn btn-primary" onClick={() => console.log('sendTestFeedback()')}>Send Test Message</button> }
          { isLoading &&
            <button className="btn btn-primary" disabled>
              <span className="spinner-border spinner-border-sm"></span>
              Loading..
            </button>
          }
        </div>
      </div>
      <div style={{ color: 'green' }}></div>
      { error && <div style={{ color: 'red' }}>{error}</div> }
    </>
  );
}
