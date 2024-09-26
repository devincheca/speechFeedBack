// Amplify
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://6t3qvwt2gbc7dak5xftdbnmu7q.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-atkiigazbreblooc53jpnvv2pm'
    }
  }
});

export default generateClient();
