import { getVotesPoll } from "./req";

export const getVotes = async (voteId: string, callback: (votes: string[]) => void) => {
  const votes: string[] = [];

  const polledVotes = await getVotesPoll({ queryString: `voteId=${voteId}` });
  console.log('votes: ', polledVotes);
  setTimeout(() => getVotes(voteId, callback), 1000);

  callback(votes);
};
