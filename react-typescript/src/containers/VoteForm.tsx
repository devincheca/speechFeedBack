import React, { useRef, useState } from 'react';

// Helpers
import { req } from '../helpers/req';
import { generateTimeStamp } from '../helpers/timeStamp';

// Components
import { LoadingButton } from '../components';

// Constant
import { POST_ACTIONS, TABLE_NAMES } from '../constants';

export const VoteForm = (props: {
  Id: string,
  inboundVoteLink: string
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const voteInput = useRef<HTMLInputElement>(null)

  const submitVote = async () => {
    setIsLoading(true);
    await req({
      data: {
        TableName: TABLE_NAMES.VOTE_LINKS,
        Item: {
          Action: POST_ACTIONS.POST_VOTE,
          Vote: voteInput.current && voteInput.current.value,
          TimeStamp: generateTimeStamp(),
          Id: props.Id,
          VoteId: props.inboundVoteLink,
        },
      },
    });
    setIsLoading(false);
  };

  return <>
    <div>
      <div className="form-group">
        <input className="form-control" ref={voteInput} autoFocus />
      </div>
      <div className="form-group text-right">
        <button type="button" className="btn btn-primary" onClick={() => submitVote()}>Submit Vote</button>
        { isLoading && <LoadingButton /> }
      </div>
    </div>
  </>;
};
