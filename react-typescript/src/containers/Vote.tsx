import React, { useState, useRef, useEffect } from 'react';

// Components
import {
  CopyButton,
  // QrCode,
} from '../components';

// Helpers
import { copyToClipboard, getVotes } from '../helpers';

export default function Vote(props: { Id: string }) {
  // const [error, setError] = useState('');
  // const [qrCodeImageUrl] = useState('');
  const Id = props.Id;
  const [link] = useState(`https://ti-manager.com?voteId=${Id}`);
  const [votes, setVotes] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    getVotes(Id, votes => setVotes(votes));
  }, [Id]);

  const linkBox = useRef<HTMLInputElement>(null);

  const copyLink = () => {
    const result = copyToClipboard(linkBox);

    result.isFailedCopy
      ? setCopyStatus('Failed')
      : setCopyStatus('Copied');

    setTimeout(() => setCopyStatus(''), 3000);
  };

  const votesView = votes.map(vote => <div>
    { vote }
  </div>);

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
        { votesView }
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
