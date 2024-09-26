import React, { useState, useRef, useEffect, useReducer } from 'react';

// Components
import { CopyButton } from '../../components';

// Helpers
import { copyToClipboard, getVotes, getQrCode } from '../../helpers';
import { KEYS } from '../../react-keys';

// Redux
import reducer from './reducer';
import ACTIONS from './actions';

export default function Vote(props: { Id: string }) {
  const Id = props.Id;

  const [link] = useState(`https://ti-manager.com?voteId=${Id}`);
  const [{ votes }, dispatch] = useReducer(reducer, { votes: [] });
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    getVotes(Id, (vote: string) => dispatch({
      type: ACTIONS.UPDATE_VOTES,
      payload: { vote },
    }));
  }, []);

  const linkBox = useRef<HTMLInputElement>(null);
  const qrBox = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrBox && qrBox.current) {
      getQrCode(qrBox.current, link);
    }
  }, [qrBox, link]);

  const copyLink = () => {
    const result = copyToClipboard(linkBox);

    result.isFailedCopy
      ? setCopyStatus('Failed')
      : setCopyStatus('Copied');

    setTimeout(() => setCopyStatus(''), 3000);
  };

  const votesView = votes && votes.map((vote, i) => <div key={`${KEYS.VOTE_LIST}_${i}`}>{ vote }</div>);

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
        <div className="form-group text-center" id="qrCodeImage">
          <div>For hybrid meetings:</div>
          <canvas ref={qrBox}></canvas>
        </div>
        <div>
          Votes will appear below:
          { votesView }
        </div>
      </div>
    </>
  );
}
