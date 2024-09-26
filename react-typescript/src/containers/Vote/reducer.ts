import ACTIONS from './actions';

interface VoteAction {
  type: string,
  payload: { vote: string },
}

export default function reducer(state: { votes: string[] }, { type, payload }: VoteAction) {
  switch(type) {
    case ACTIONS.UPDATE_VOTES:
      state = { votes: state.votes.concat(payload.vote) }
      break;
    default:
      break;
  }

  return { ...state };
}
