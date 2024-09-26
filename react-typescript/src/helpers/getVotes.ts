// App Sync Amplify GraphQL Configuration
import client from '../app-sync-amplify-configure';

// GraphQL
import * as subscriptions from '../graphql/subscriptions';

export const getVotes = async (voteId: string, callback: (vote: string) => void) => {
  const subscription: any = client
    .graphql({ query: subscriptions.onCreateTiVotes })

  subscription
    .subscribe({
      next: ({ data }: any) => callback(data.onCreateTiVotes.Vote),
      error: (error: any) => console.error(error),
    });
};
