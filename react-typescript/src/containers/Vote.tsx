import React, { useState, useRef } from 'react';
import { v1 as uuidv1 } from 'uuid';

// Components
import {
  CopyButton,
  // QrCode,
} from '../components';

// Helpers
import { copyToClipboard } from '../helpers/copyToClipboard';

export default function Vote() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [qrCodeImageUrl] = useState('');
  const [Id] = useState(uuidv1());
  const [link] = useState(`https://ti-manager.com?voteId=${Id}`);
  // so the backend POST endpoint needs to just post any votes sent with TTL
  // then the polling GET endpoint needs to get them all filtered by the id
  const [copyStatus, setCopyStatus] = useState('');

  const linkBox = useRef<HTMLInputElement>(null);

  const copyLink = () => {
    const result = copyToClipboard(linkBox);

    result.isFailedCopy
      ? setCopyStatus('Failed')
      : setCopyStatus('Copied');

    setTimeout(() => setCopyStatus(''), 3000);
  };

  return (
    <>
      <div className="inputPhoneHeader">Copy the following link and send it to your club members so they may cast their vote for best table topic, best speaker, or best evaluator</div>
      <div>
        <div className="copyPasteGroup">
          { link &&
            <div className="form-group">
              <input type="text" disabled className="form-control" value={link} ref={linkBox} />
            </div>
          }
          <div></div>
          { link && <CopyButton copy={() => copyLink()} copyStatus={copyStatus} /> }
        </div>
        {/*
        <div className="form-group text-center" id="qrCodeImage">
          <div>For hybrid meetings:</div>
          <div style="display: none;" id="qrUrl">{{ qrCode }}</div>
        </div>
        */}
      </div>
    </>
  );
}
