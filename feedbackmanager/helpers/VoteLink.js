const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const v4 = require('uuid');

class VoteLink {
  constructor() {}

  async getNewVotingLink() {
    try {
      const linkId = v4();
      const originator = v4();
      const params = {
        Item: {
          'tm-anon-votes_dynamo_id': { S: linkId },
          'tm-anon-votes_originator': { S: originator },
          'votes': { S: JSON.stringify([]) },
          'timeStamp': { N: (Math.floor(Date.now() / 1000) + (24*60*60)).toString() },
          'isSaving': { BOOL: false }
        },
        TableName: 'tm-anon-votes'
      };
      await dynamodb.putItem(params).promise();
      return { linkId, originator };
    }
    catch(error) {
      console.trace(error);
      return 'Oops, Something went wrong.'
    }
  }
}

module.exports = VoteLink;
