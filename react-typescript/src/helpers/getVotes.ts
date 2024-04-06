import { getVotesPoll } from "./req";

export const getVotes = async (voteId: string, callback: (votes: string[]) => void) => {
  const polledVotes = await getVotesPoll({ queryString: `voteId=${voteId}` });
  const { Items } = polledVotes;

  interface Vote {
    Vote: string;
  }

  callback(Items.map((vote: Vote) => vote.Vote));

  setTimeout(() => getVotes(voteId, callback), 1000);
};
