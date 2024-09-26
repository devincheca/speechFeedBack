// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TiVotes, TiVotesConnection } = initSchema(schema);

export {
  TiVotes,
  TiVotesConnection
};