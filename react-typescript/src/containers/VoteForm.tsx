import React, { useRef, useState } from 'react';

// Components
import { LoadingButton } from '../components';

// App Sync Amplify GraphQL Configuration
import client from '../app-sync-amplify-configure';

// GraphQL
import * as mutations from '../graphql/mutations';

export const VoteForm = (props: {
  Id: string,
  inboundVoteLink: string
}) => {
  const { inboundVoteLink, Id } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isVoteDuplicate, setVoteDuplicate] = useState(false);

  const voteInput = useRef<HTMLInputElement>(null)

  const submitVote = async () => {
    if (localStorage.getItem('voteId') === inboundVoteLink) return setVoteDuplicate(true);

    setIsLoading(true);

    await client
      .graphql({
        query: mutations.createTiVotes,
        variables:{
          input: {
            Vote: voteInput.current && voteInput.current.value,
            Id: Id,
            VoteId: inboundVoteLink,
          }
        }
      });

    localStorage.setItem('voteId', inboundVoteLink);
    setIsLoading(false);
  };

  return <>
    <div>
      <div className="form-group">
        <input className="form-control" ref={voteInput} autoFocus />
      </div>
      { isVoteDuplicate && <div>Sorry, you cannot vote twice.</div> }
      <div className="form-group text-right">
        { !isLoading && <button type="button" className="btn btn-primary" onClick={() => submitVote()}>Submit Vote</button> }
        { isLoading && <LoadingButton /> }
      </div>
    </div>
  </>;
};
